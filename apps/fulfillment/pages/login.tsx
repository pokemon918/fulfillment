import {
  Button,
  Container,
  GoogleAuthButton,
  gql,
  graphqlReq,
  Input,
  isGqlErrStatus,
  makeStyles,
  Navbar,
  OrSeparator,
  PageBgColor,
  Paper,
  setCookie,
  StyledLink,
} from 'common'
import { useForm } from 'react-hook-form'

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token

      user {
        _id
        fullName
        role
      }
    }
  }
`

const Login = () => {
  const styles = useStyles({})

  const { control, handleSubmit } = useForm<{
    email: string
    password: string
  }>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const {
        login: { token, user },
      } = await graphqlReq(LOGIN, {
        input: data,
      })

      const YEAR = 1000 * 60 * 60 * 24 * 365

      const expireAt = new Date(Date.now() + YEAR)

      setCookie('fulfillment_token', token, expireAt)
      localStorage.setItem('fulfillment_user', JSON.stringify(user))

      window.location.href = '/'
    } catch (e) {
      if (isGqlErrStatus(e, 401)) {
        alert('password or email is incorrect')
      }
    }
  })

  return (
    <>
      <PageBgColor bgColor="#f8f8f8" />

      <Navbar />

      <Container maxWidth="xs">
        <Paper style={{ marginTop: 48, marginBottom: 16 }}>
          <form onSubmit={onSubmit}>
            <h2 css={styles.heading}>Login</h2>

            <div style={{ marginBottom: 16 }}>
              <GoogleAuthButton
                href={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google`}
              />
            </div>

            <OrSeparator style={{ marginBottom: 12 }} />

            <Input
              style={{ marginBottom: 16 }}
              type="email"
              label="Email"
              name="email"
              control={control}
              required
            />

            <Input
              style={{ marginBottom: 16 }}
              type="password"
              label="Password"
              name="password"
              control={control}
              required
            />

            <Button type="submit" fullWidth fullRounded>
              Login
            </Button>
          </form>
        </Paper>

        <p style={{ textAlign: 'center' }}>
          Forgot your password?{' '}
          <StyledLink href="/begin-reset-password">Reset it</StyledLink>
        </p>
      </Container>
    </>
  )
}

const useStyles = makeStyles(() => ({
  heading: {
    fontWeight: '700',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    textAlign: 'center',
    marginBottom: 16,
  },
}))

export default Login
