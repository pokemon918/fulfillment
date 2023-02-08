import { PageLayout, Redirect } from '../components'
import { useUser } from '../hooks'
import { AuthUser } from '../types'
import { ComponentType } from 'react'

export const withAuth = <P extends {}>(
  WrappedComponent: ComponentType<P>,
  requiredRole: AuthUser['role']
) => {
  return (props: P) => {
    const user = useUser()

    if (typeof user === 'undefined') return null

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
