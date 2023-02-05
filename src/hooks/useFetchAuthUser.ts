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

const useFetchAuthUser = () => {
  const [user, setUser] = useState<AuthUser | null | undefined>()

  useEffect(() => {
    ;(async () => {
      const { fetchedUser } = await graphqlReq(GET_USER_ME)

      setUser(fetchedUser)
    })()
  }, [])

  return user
}

export default useFetchAuthUser
