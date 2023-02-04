import { AuthUser } from '@/types/user'
import { deleteCookie, setCookie } from '@/utils/cookies'
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

const useFetchAuthUser = (storedUserString: string | null) => {
  const [user, setUser] = useState<AuthUser | null>(
    (() => {
      if (storedUserString) {
        try {
          const parsed = JSON.parse(decodeURIComponent(storedUserString))

          if (
            parsed &&
            typeof parsed === 'object' &&
            typeof parsed._id === 'string' &&
            typeof parsed.fullName === 'string' &&
            typeof parsed.role === 'string'
          ) {
            return parsed
          }
        } catch {}
      }

      return null
    })()
  )

  useEffect(() => {
    ;(async () => {
      const { fetchedUser } = await graphqlReq(GET_USER_ME)

      if (fetchedUser) {
        if (
          !user ||
          user._id !== fetchedUser._id ||
          user.fullName !== fetchedUser.fullName ||
          user.role !== fetchedUser.role
        ) {
          const YEAR = 1000 * 60 * 60 * 24 * 365
          const expireAt = new Date(Date.now() + YEAR)
          
          setCookie(
            'token_user',
            encodeURIComponent(JSON.stringify(fetchedUser)),
            expireAt
          )

          setUser(fetchedUser)
        }
      } else {
        deleteCookie('token')
        deleteCookie('token_user')

        if (user) setUser(null)
      }
    })()
  }, [])

  return user
}

export default useFetchAuthUser
