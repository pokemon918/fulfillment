import Input from '@/ui/Input'
import { gql } from 'graphql-request'
import graphqlReq, { isGqlErrStatus } from '@/utils/graphqlReq'
import { useForm } from 'react-hook-form'
import Paper from '@/ui/Paper'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import makeStyles from '@/utils/makeStyles'
import Navbar from '@/components/Navbar'
import PageBgColor from '@/ui/PageBgColor'
import { useState } from 'react'
import Alert from '@/ui/Alert'
import { useRouter } from 'next/router'
import { deleteCookie } from '@/utils/cookies'
import StyledLink from '@/ui/StyledLink'

const RESET_PASSWORD = gql`
  mutation ResetPassword($resetToken: String!, $newPassword: String!) {
    resetPassword(resetToken: $resetToken, newPassword: $newPassword)
  }
`

const BeginResetPassword = () => {
  const styles = useStyles({})

  const { query } = useRouter()

  const resetToken = query.resetToken as string

  const { control, handleSubmit } = useForm<{
    newPassword: string
  }>({
    defaultValues: {
      newPassword: '',
    },
  })

  const [loading, setLoading] = useState(false)
  const [errCode, setErrCode] = useState<'INVALID' | 'UNKNOWN' | null>(null)

  const onSubmit = handleSubmit(async ({ newPassword }) => {
    setLoading(true)

    try {
      await graphqlReq(RESET_PASSWORD, {
        resetToken,
        newPassword,
      })

      deleteCookie('fulfillment_token')
      window.localStorage.removeItem('fulfillment_user')

      window.location.href = '/login'
    } catch (e) {
      setErrCode(isGqlErrStatus(e, 400) ? 'INVALID' : 'UNKNOWN')
    } finally {
      setLoading(false)
    }
  })

  let content = (
    <form onSubmit={onSubmit}>
      <h2 css={styles.heading}>Enter New Password</h2>

      {errCode && errCode !== 'INVALID' && (
        <Alert severity="error" style={{ marginBottom: 12 }}>
          please make sure you are connected to the internet, then try again
        </Alert>
      )}

      <Input
        style={{ marginBottom: 16 }}
        type="password"
        label="Password"
        name="newPassword"
        control={control}
        required
      />

      <Button type="submit" fullWidth fullRounded disabled={loading}>
        Reset Password
      </Button>
    </form>
  )

  if (errCode === 'INVALID') {
    content = (
      <Alert severity="error">
        The password reset link is invalid or has been expired. you can create a
        new one <StyledLink href="/begin-reset-password">from here</StyledLink>
      </Alert>
    )
  }

  return (
    <>
      <PageBgColor bgColor="#f8f8f8" />

      <Navbar />

      <Container maxWidth="xs">
        <Paper style={{ marginTop: 48, marginBottom: 16 }}>{content}</Paper>
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

export default BeginResetPassword
