import graphqlReq from '@/utils/graphqlReq'
import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import { GetServerSideProps } from 'next'
import Container from '@/ui/Container'
import ProductVertical from '@/components/ProductVertical'
import theme from '@/theme'
import { BaseUser, DetailedUser } from '@/types/user'
import PageLayout from '@/components/PageLayout'
import accountTypes from '@/data/accountTypes'
import { getCookie } from '@/utils/cookies'
import Paper from '@/ui/Paper'
import StyledLink from '@/ui/StyledLink'
import UserProfile from '@/components/UserProfile'
import withAuth from '@/hoc/withAuth'

function PageUser(props: PageUserProps) {
  const { user, products } = props

  const styles = useStyles(props)

  return (
    <PageLayout>
      <Container maxWidth="md">
        <h3 css={styles.heading}>User: {user.fullName}</h3>

        <UserProfile user={user} products={products} />
      </Container>
    </PageLayout>
  )
}

interface PageUserProps {
  user: DetailedUser
  products: string[]
}

export default withAuth(PageUser, 'admin')

const useStyles = makeStyles((props: PageUserProps) => ({
  heading: {
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 24,
  },
}))

const GET_USERS = gql`
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

    products {
      _id
      name {
        en
      }
    }
  }
`

export const getServerSideProps: GetServerSideProps<PageUserProps> = async (
  ctx
) => {
  const token = getCookie(ctx.req.headers.cookie ?? '', 'fulfillment_token')
  const userId = ctx.query.userId

  const data = await graphqlReq(GET_USERS, { userId }, {}, token)

  const products: string[] = []

  data.products.forEach((product: any) => {
    if (!products.includes(product.name.en)) {
      products.push(product.name.en)
    }
  })

  return {
    props: {
      user: data.user,
      products,
    },
  }
}
