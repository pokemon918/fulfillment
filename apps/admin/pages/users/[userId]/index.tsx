import {
  Container,
  DetailedUser,
  gql,
  makeStyles,
  PageLayout,
  useGql,
  UserProfile,
  withAuth,
} from 'common'
import { useRouter } from 'next/router'

function PageUser(props: PageUserProps) {
  const styles = useStyles(props)

  const router = useRouter()

  const { userId } = router.query

  const { data } = useGql<{
    user: DetailedUser | null
  }>(GET_USER, { userId }, !!userId)

  return (
    <PageLayout>
      <Container maxWidth="md">
        {!data?.user ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : (
          <>
            <h3 css={styles.heading}>User: {data.user.fullName}</h3>
            <UserProfile user={data.user} />
          </>
        )}
      </Container>
    </PageLayout>
  )
}

interface PageUserProps {}

export default withAuth(PageUser, 'admin')

const useStyles = makeStyles((props: PageUserProps) => ({
  heading: {
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 24,
  },
}))

const GET_USER = gql`
  query ($userId: String!) {
    user(_id: $userId) {
      _id
      fullName
      companyName
      country
      email
      phone
      role
      commercialInfo
    }
  }
`
