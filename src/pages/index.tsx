import Products from '@/components/Products'
import HomeBanner from '@/components/HomeBanner'
import Overview from '@/components/Overview'
import { BaseProduct } from '@/types/product'
import Container from '@/ui/Container'
import graphqlRequest from '@/utils/graphqlRequest'
import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import { GetServerSideProps } from 'next'
import { BaseCategory } from '@/types/category'
import { BaseArticle } from '@/types/article'
import BlogOverview from '@/components/BlogOverview'
import Footer from '@/components/Footer'
import CategoriesOverview from '@/components/CategoriesOverview'
import RelatedProducts from '@/components/RelatedProducts'
import ContainerWide from '@/ui/ContainerWide'

interface HomeProps {
  categories: BaseCategory[]
  products: BaseProduct[]
  articles: BaseArticle[]
}

export default function Home(props: HomeProps) {
  const { categories, products, articles } = props

  const styles = useStyles(props)

  return (
    <>
      <HomeBanner />

      <CategoriesOverview
        categories={categories}
        style={{ marginBottom: 114 }}
      />

      <Container maxWidth="md">
        <h4 css={styles.heading} style={{ marginBottom: 52 }}>
          Overview of TRU MARKET Fulfillment Solution
        </h4>

        <Overview style={{ marginBottom: 82 }} />

        <h4 css={styles.heading} style={{ marginBottom: 34 }}>
          DEAL OPPORTUNITIES
        </h4>

        <Products products={products} style={{ marginBottom: 162 }} />
      </Container>

      <ContainerWide>
        <BlogOverview style={{ marginBottom: 122 }} articles={articles} />
      </ContainerWide>

      <Footer />
    </>
  )
}

const useStyles = makeStyles((props: HomeProps) => ({
  heading: {
    fontWeight: 700,
    fontSize: 30,
    lineHeight: 1.25,
    textAlign: 'center',
    color: '#69832C',
  },
}))

const GET_DATA = gql`
  query {
    categories {
      _id
      name {
        en
      }
      thumbnail
    }

    products {
      _id
      name {
        en
      }
      thumbnail
      country
      price
      categoryId
      availableSpecs {
        en
      }
    }

    articles {
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const data = await graphqlRequest(GET_DATA, {}, {})

  return {
    props: {
      categories: data.categories.map((category: any) => ({
        ...category,
        name: category.name.en,
      })),
      products: data.products.map((product: any) => ({
        ...product,
        name: product.name.en,
        availableSpecs: product.availableSpecs.en,
      })),
      articles: data.articles.map((article: any) => ({
        ...article,
        title: article.title.en,
        description: article.description.en,
      })),
    },
  }
}
