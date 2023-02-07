import { AuthUser } from '@/types/user'
import { deleteCookie } from '@/utils/cookies'
import graphqlReq from '@/utils/graphqlReq'
import { gql } from 'graphql-request'
import { useEffect, useState } from 'react'

const GET_USER_ME = gql`
  {
    fetchedUser: userProfile {
      _id
      fullName
      role
    }
  }
`

const getCachedUser = () => {
  if (typeof window === 'undefined') return null

  const storedUser = window.localStorage.getItem('fulfillment_user')

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser)

      if (
        parsedUser &&
        typeof parsedUser._id === 'string' &&
        typeof parsedUser.fullName === 'string' &&
        typeof parsedUser.role in ['admin', 'buyer', 'seller']
      )
        return {
          _id: parsedUser._id,
          fullName: parsedUser.fullName,
          role: parsedUser.role,
        }
    } catch {}
  }

  return null
}

const useFetchAuthUser = () => {
  const [user, setUser] = useState<AuthUser | null | undefined>()

  useEffect(() => {
    const cachedUser = getCachedUser()

    if (cachedUser) setUser(cachedUser)
    
    ;(async () => {
      const { fetchedUser } = await graphqlReq(GET_USER_ME)

      if (!fetchedUser) {
        deleteCookie('fulfillment_token')
        window.localStorage.removeItem('fulfillment_user')
      } else if (
        !cachedUser ||
        cachedUser._id !== fetchedUser._id ||
        cachedUser.fullName !== fetchedUser.fullName ||
        cachedUser.role !== fetchedUser.role
      ) {
        window.localStorage.setItem('fulfillment_user', JSON.stringify(fetchedUser))
      }

      setUser(fetchedUser)
    })()
  }, [])

  return user
}

export default useFetchAuthUser
