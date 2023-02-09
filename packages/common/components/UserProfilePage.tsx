
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { APP_TYPE } from '../constants'
import { DetailedUser } from '../types'
import { Button, Container, PageBgColor, Paper } from '../ui'
import { deleteCookie, gql, graphqlReq } from '../utils'
import { Navbar } from './Navbar'
import { UserProfile } from './UserProfile'

const GET_PROFILE = gql`
  {
    user: userProfile {
      _id
      fullName
      companyName
      country
      email
      phone
      role
    }
  }
`

export const UserProfilePage = () => {
  const { setValue, control } = useForm<{
    user?: DetailedUser
  }>()

  const user = useWatch({ control, name: 'user' })

  useEffect(() => {
    ;(async () => {
      const data = await graphqlReq(GET_PROFILE)

      setValue('user', data.user)
    })()
  }, [])

  const logout = () => {
    deleteCookie(`${APP_TYPE}_token`)
    window.localStorage.removeItem(`${APP_TYPE}_user`)
    window.location.href = '/'
  }

  return (
    <>
      <Navbar />

      <PageBgColor bgColor="#f8f8f8" />

      <Container maxWidth="xs">
        <div style={{ marginTop: 48 }}>
          {!user ? (
            <p style={{ textAlign: 'center' }}>Loading...</p>
          ) : (
            <Paper>
              <UserProfile user={user} />

              <Button
                onClick={logout}
                style={{ background: '#dc2626', color: '#fff' }}
                type="submit"
                fullWidth
                fullRounded
              >
                LOGOUT
              </Button>
            </Paper>
          )}
        </div>
      </Container>
    </>
  )
}
