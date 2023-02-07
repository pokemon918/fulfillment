import graphqlReq from '@/utils/graphqlReq'
import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import { GetServerSideProps } from 'next'
import Container from '@/ui/Container'
import { BaseUser } from '@/types/user'
import PageLayout from '@/components/PageLayout'
import accountTypes from '@/data/accountTypes'
import { getCookie } from '@/utils/cookies'
import StyledLink from '@/ui/StyledLink'
import withAuth from '@/hoc/withAuth'

function PageUsers(props: PageUsersProps) {
  const { users } = props

  const styles = useStyles(props)

  return (
    <PageLayout>
      <Container maxWidth="md">
        <h3 css={styles.heading}>Users</h3>

        <table css={styles.table}>
          <thead css={styles.thead}>
            <tr>
              <th css={styles.cell}>Full Name</th>
              <th css={styles.cell}>Email</th>
              <th css={styles.cell}>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
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
      </Container>
    </PageLayout>
  )
}

interface PageUsersProps {
  users: BaseUser[]
}

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
    users (descCreatedAt: true) {
      _id
      fullName
      email
      role
    }
  }
`

export const getServerSideProps: GetServerSideProps<PageUsersProps> = async (
  ctx
) => {
  const token = getCookie(ctx.req.headers.cookie ?? '', 'fulfillment-token')

  const { users } = await graphqlReq(GET_USERS, {}, {}, token)

  return {
    props: {
      users,
    },
  }
}
