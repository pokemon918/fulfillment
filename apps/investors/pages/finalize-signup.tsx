import { Signup } from 'common'
import { useRouter } from 'next/router'

export default function PageFinalizeSignup() {
  const { query, isReady } = useRouter()

  const pendingUserToken = query.pendingUserToken as string | undefined
  const defaultFullName = query.fullName as string | undefined

  if (!isReady) return null

  return (
    <Signup
      pendingUserToken={pendingUserToken}
      defaultFullName={defaultFullName}
    />
  )
}
