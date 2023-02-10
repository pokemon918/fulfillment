import {
  BaseCategory,
  BaseInvestment,
  Container,
  graphqlReq,
  Investments,
  PageLayout,
} from 'common'
import { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

interface PageInvestmentsProps {
  category: BaseCategory
  investments: BaseInvestment[]
}

export default function PageInvestments(props: PageInvestmentsProps) {
  const { investments, category } = props

  return (
    <PageLayout>
      <Container maxWidth="md">
        <h3
          css={{
            fontSize: 25,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          Investments / {category.name}
        </h3>

        <Investments investments={investments} action="view" />
      </Container>
    </PageLayout>
  )
}

const GET_CATEGORY_INVESTMENTS = gql`
  query ($categoryId: String!) {
    category(_id: $categoryId) {
      _id
      name {
        en
      }
    }

    investments(categoryId: $categoryId, descCreatedAt: true) {
      _id

      name {
        en
      }

      thumbnail

      country

      goalAmount
      paidAmount
    }
  }
`

export const getStaticProps: GetStaticProps<PageInvestmentsProps> = async (
  ctx
) => {
  const categoryId = ctx.params?.categoryId as string

  const data = await graphqlReq(GET_CATEGORY_INVESTMENTS, { categoryId })

  return {
    props: {
      category: {
        ...data.category,
        name: data.category.name.en,
      },
      investments: data.investments.map((investment: any) => ({
        ...investment,
        name: investment.name.en,
      })),
    },
  }
}

const GET_CATEGORIES = gql`
  query {
    categories {
      _id
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const { categories } = await graphqlReq(GET_CATEGORIES)

  const paths = categories.map((category: any) => ({
    params: { categoryId: category._id },
  }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}
