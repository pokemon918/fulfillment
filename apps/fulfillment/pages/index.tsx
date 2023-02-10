import {
  BaseArticle,
  BaseCategory,
  BaseProduct,
  BlogOverview,
  CategoriesOverview,
  ContainerWide,
  Footer,
  gql,
  graphqlReq,
  HomeBanner,
  makeStyles,
  Overview,
  ProductsOverview,
} from 'common'
import { GetStaticProps } from 'next'

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
        style={{ marginBottom: 114, position: 'relative' }}
      />

      <Overview style={{ marginBottom: 82 }} />

      <ProductsOverview style={{ marginBottom: 162 }} products={products} />

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

    products(descCreatedAt: true) {
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
      products: data.products.slice(0, 4).map((product: any) => ({
        ...product,
        name: product.name.en,
        availableSpecs: product.availableSpecs.en,
      })),
      articles: data.articles.slice(0, 10).map((article: any) => ({
        ...article,
        title: article.title.en,
        description: article.description.en,
      })),
    },
    revalidate: 60
  }
}
