import { gql } from 'graphql-request'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { APP_TYPE } from '../constants'
import {
  Alert,
  Button,
  Container,
  GoogleAuthButton,
  Input,
  OrSeparator,
  PageBgColor,
  Paper,
  StyledLink,
} from '../ui'
import { graphqlReq, isGqlErrStatus, makeStyles, setCookie } from '../utils'
import { Navbar } from './Navbar'

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

const apps = {
  fulfillment: process.env.NEXT_PUBLIC_FULFILLMENT!,
  investor: process.env.NEXT_PUBLIC_INVESTOR!,
}

export const LoginPage = () => {
  const [invalidRole, setInvalidRole] = useState<string | null>(null)

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

      const authType = user.role === 'investor' ? 'investor' : 'fulfillment'

      if (APP_TYPE === authType) {
        setCookie(`${APP_TYPE}_token`, token, expireAt)
        localStorage.setItem(`${APP_TYPE}_user`, JSON.stringify(user))
        window.location.href = '/'
      } else {
        setInvalidRole(user.role)
      }
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

            {invalidRole && (
              <Alert style={{ marginBottom: 12 }} severity="error">
                account type is {invalidRole} please{' '}
                <StyledLink
                  href={
                    apps[
                      APP_TYPE === 'fulfillment' ? 'investor' : 'fulfillment'
                    ] + '/login'
                  }
                >
                  login here instead
                </StyledLink>
              </Alert>
            )}

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
