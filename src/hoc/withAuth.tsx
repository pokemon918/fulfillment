import PageLayout from '@/components/PageLayout'
import Redirect from '@/components/Redirect'
import { useUser } from '@/hooks/useUser'
import { AuthUser } from '@/types/user'
import { ComponentType } from 'react'

const withAuth = <P extends {}>(
  WrappedComponent: ComponentType<P>,
  requiredRole: AuthUser['role']
) => {
  return (props: P) => {
    const user = useUser()

    if (!user) return <Redirect to="/login" />

    if (user.role !== requiredRole)
      return (
        <PageLayout>
          <h3 style={{ textAlign: 'center', fontSize: 25 }}>
            403 Error: Forbidden
          </h3>
        </PageLayout>
      )

    return <WrappedComponent {...props} />
  }
}

export default withAuth
