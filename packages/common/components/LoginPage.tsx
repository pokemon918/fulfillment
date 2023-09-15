import { gql } from 'graphql-request'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
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
import { toast } from 'react-toastify'

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

const CREATE_LOG = gql`
  mutation createLog($input: CreateLogInput!) {
    createLog(input: $input)  {
      _id
    }
  }
`

const apps = {
  fulfillment: process.env.NEXT_PUBLIC_FULFILLMENT!,
  investment: process.env.NEXT_PUBLIC_INVESTMENT!,
  admin: process.env.NEXT_PUBLIC_ADMIN!,
}

export const LoginPage = () => {
  const [matchingRole, setMismatchingRole] = useState<string | null>(null)

  const styles = useStyles({})

  const router = useRouter()

  useEffect(() => {
    if (router.query.mismatchingRole) {
      setMismatchingRole(router.query.mismatchingRole as string)
    }
  }, [router.isReady])

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

      const acceptType = user.role === 'investor' ? ['fulfillment'] : user.role === 'admin' ? ['admin', 'fulfillment', 'investment'] : ['fulfillment']

      if (acceptType.includes(APP_TYPE)) {
        setCookie(`${APP_TYPE}_token`, token, expireAt)
        localStorage.setItem(`${APP_TYPE}_user`, JSON.stringify(user))
        if (user.role === 'admin' && APP_TYPE === 'admin') {
          await graphqlReq(CREATE_LOG, {
            input: {
              "userId": user?._id,
              "description": {
                "en": "Log In",
                "es": ""
              }
            }
          })
        }
        window.location.href = '/'
      } else {
        setMismatchingRole(user.role)
      }
    } catch (e) {
      if (isGqlErrStatus(e, 401)) {
        toast('password or email is incorrect')
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

            {matchingRole && (
              <Alert style={{ marginBottom: 12 }} severity="error">
                account type is {matchingRole} please{' '}
                <StyledLink
                  href={
                    apps[
                      matchingRole === 'investor' ? 'investment' : matchingRole === 'admin' ? 'admin' : 'fulfillment'
                    ] + '/login'
                  }
                >
                  login here instead
                </StyledLink>
              </Alert>
            )}

            <div style={{ marginBottom: 16 }}>
              <GoogleAuthButton
                href={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google/${APP_TYPE}`}
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
