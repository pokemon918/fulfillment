import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import Container from '@/ui/Container'
import { BaseUser } from '@/types/user'
import PageLayout from '@/components/PageLayout'
import accountTypes from '@/data/accountTypes'
import StyledLink from '@/ui/StyledLink'
import withAuth from '@/hoc/withAuth'
import useGql from '@/hooks/useGql'

function PageUsers(props: PageUsersProps) {
  const styles = useStyles(props)

  const { data } = useGql<{
    users: BaseUser[]
  }>(GET_USERS)

  const loading = !data

  return (
    <PageLayout>
      <Container maxWidth="md">
        <h3 css={styles.heading}>Users</h3>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : (
          <table css={styles.table}>
            <thead css={styles.thead}>
              <tr>
                <th css={styles.cell}>Full Name</th>
                <th css={styles.cell}>Email</th>
                <th css={styles.cell}>Role</th>
              </tr>
            </thead>

            <tbody>
              {data.users.map((user) => (
                <tr key={user._id}>
                  <td css={styles.cell}>
                    <StyledLink href={`/users/${user._id}`}>
                      {user.fullName}
                    </StyledLink>
                  </td>
                  <td css={styles.cell}>{user.email}</td>
                  <td css={styles.cell}>{accountTypes[user.role]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </PageLayout>
  )
}

interface PageUsersProps {}

export default withAuth(PageUsers, 'admin')

const useStyles = makeStyles((props: PageUsersProps) => ({
  heading: {
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 24,
  },
  table: {
    width: '100%',
    textAlign: 'left',
  },
  thead: {
    backgroundColor: '#f8f8f8',
  },
  cell: {
    padding: '8px 24px',
  },
}))

const GET_USERS = gql`
  query {
    users(descCreatedAt: true) {
      _id
      fullName
      email
      role
    }
  }
`
