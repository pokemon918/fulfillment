import Input from '@/ui/Input'
import { gql } from 'graphql-request'
import graphqlReq, { isGqlErrStatus } from '@/utils/graphqlReq'
import { useForm, useWatch } from 'react-hook-form'
import Paper from '@/ui/Paper'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import makeStyles from '@/utils/makeStyles'
import Navbar from '@/components/Navbar'
import PageBgColor from '@/ui/PageBgColor'
import { useState } from 'react'
import Alert from '@/ui/Alert'

const BEGIN_RESET_PASSWORD = gql`
  mutation BeginResetPassword($email: String!) {
    beginResetPassword(email: $email)
  }
`

const BeginResetPassword = () => {
  const styles = useStyles({})

  const { control, handleSubmit } = useForm<{
    email: string
  }>({
    defaultValues: {
      email: '',
    },
  })

  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const email = useWatch({ control, name: 'email' })

  const onSubmit = handleSubmit(async ({ email }) => {
    setLoading(true)

    try {
      await graphqlReq(BEGIN_RESET_PASSWORD, { email })
      setIsSuccess(true)
    } catch (e) {
      setError(
        isGqlErrStatus(e, 400)
          ? 'The entered email is not registered'
          : 'Please check your internet connection'
      )
    } finally {
      setLoading(false)
    }
  })

  let content = (
    <form onSubmit={onSubmit}>
      <h2 css={styles.heading}>Reset Your Password</h2>

      {error && (
        <Alert severity="error" style={{ marginBottom: 12 }}>
          {error}
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

      <Button type="submit" fullWidth fullRounded disabled={loading}>
        Send password reset email
      </Button>
    </form>
  )

  if (isSuccess) {
    content = (
      <Alert severity="success">
        <p>The password reset link has been sent to your email</p>
        <p style={{ fontWeight: 700, wordBreak: 'break-word' }}>"{email}"</p>
        <p>Please check your primary inbox, spam, ..etc</p>
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
