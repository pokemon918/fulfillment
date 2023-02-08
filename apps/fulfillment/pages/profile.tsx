import {
  Button,
  Container,
  deleteCookie,
  DetailedUser,
  gql,
  graphqlReq,
  Navbar,
  PageBgColor,
  Paper,
  UserProfile,
} from 'common'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'

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

const Profile = () => {
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
    deleteCookie('fulfillment_token')
    window.localStorage.removeItem('fulfillment_user')
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

export default Profile
