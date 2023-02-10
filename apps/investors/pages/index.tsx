import {
  BaseArticle,
  BaseCategory,
  BaseInvestment,
  BlogOverview,
  CategoriesOverview,
  ContainerWide,
  Footer,
  gql,
  graphqlReq,
  HomeBanner,
  Investments,
  InvestmentsOverview,
  makeStyles,
  Overview,
  ProductsOverview,
} from 'common'
import { GetStaticProps } from 'next'

interface HomeProps {
  categories: BaseCategory[]
  investments: BaseInvestment[]
  articles: BaseArticle[]
}

export default function Home(props: HomeProps) {
  const { categories, investments, articles } = props

  const styles = useStyles(props)

  return (
    <>
      <HomeBanner action='investments' />

      <CategoriesOverview
        categories={categories}
        style={{ marginBottom: 114, position: 'relative' }}
        itemType="investment"
      />

      <Overview style={{ marginBottom: 82 }} />

      <InvestmentsOverview
        style={{ marginBottom: 162 }}
        investments={investments}
      />

      <ContainerWide>
        <BlogOverview style={{ marginBottom: 122 }} articles={articles} />
      </ContainerWide>

      <Footer />
    </>
  )
}

const useStyles = makeStyles((props: HomeProps) => ({}))

const GET_DATA = gql`
  query {
    categories {
      _id
      name {
        en
      }
      thumbnail
    }

    investments(descCreatedAt: true) {
      _id
      name {
        en
      }
      thumbnail
      country
      goalAmount
      paidAmount
    }

    articles(descCreatedAt: true) {
      _id
      thumbnail
      title {
        en
      }
      description {
        en
      }
    }
  }
`

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const data = await graphqlReq(GET_DATA)

  return {
    props: {
      categories: data.categories.map((category: any) => ({
        ...category,
        name: category.name.en,
      })),
      investments: data.investments.slice(0, 4).map((investment: any) => ({
        ...investment,
        name: investment.name.en,
      })),
      articles: data.articles.slice(0, 10).map((article: any) => ({
        ...article,
        title: article.title.en,
        description: article.description.en,
      })),
    },
  }
}
