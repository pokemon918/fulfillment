import { AuthUser } from '../types'
import { deleteCookie } from '../utils'
import { graphqlReq } from '../utils'
import { gql } from 'graphql-request'
import { useEffect, useState } from 'react'
import { APP_TYPE } from '../constants'

const GET_USER_ME = gql`
  {
    fetchedUser: userProfile {
      _id
      fullName
      role
    }
  }
`

const getCachedUser = (storageItemName: string, acceptedRoles: string[]) => {
  if (typeof window === 'undefined') return null

  const storedUser = window.localStorage.getItem(storageItemName)

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser)

      if (
        parsedUser &&
        typeof parsedUser._id === 'string' &&
        typeof parsedUser.fullName === 'string' &&
        acceptedRoles.includes(parsedUser.role)
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

export const useFetchAuthUser = () => {
  const [user, setUser] = useState<AuthUser | null | undefined>()

  const tokenName = `${APP_TYPE}_token`
  const storageItemName = `${APP_TYPE}_user`
  const acceptedRoles =
    APP_TYPE === 'fulfillment' ? ['admin', 'buyer', 'seller'] : ['investor']

  useEffect(() => {
    const cachedUser = getCachedUser(storageItemName, acceptedRoles)

    if (typeof cachedUser !== 'undefined') setUser(cachedUser)
    ;(async () => {
      const { fetchedUser } = await graphqlReq(GET_USER_ME)

      if (!fetchedUser || !acceptedRoles.includes(fetchedUser.role)) {
        deleteCookie(tokenName)
        window.localStorage.removeItem(storageItemName)
        setUser(null)
      } else if (
        !cachedUser ||
        cachedUser._id !== fetchedUser._id ||
        cachedUser.fullName !== fetchedUser.fullName ||
        cachedUser.role !== fetchedUser.role
      ) {
        window.localStorage.setItem(
          storageItemName,
          JSON.stringify(fetchedUser)
        )

        setUser(fetchedUser)
      }
    })()
  }, [])

  return user
}
