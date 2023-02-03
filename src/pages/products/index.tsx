import { BaseProduct } from '@/types/product'
import graphqlReq from '@/utils/graphqlReq'
import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import { GetServerSideProps } from 'next'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PageBgColor from '@/ui/PageBgColor'
import Container from '@/ui/Container'
import ProductVertical from '@/components/ProductVertical'
import { BaseCategory } from '@/types/category'

export default function PageProducts(props: PageProductsProps) {
  const { products, category } = props

  const styles = useStyles(props)

  return (
    <>
      <PageBgColor bgColor="#f8f8f8" />

      <div css={styles.root}>
        <Navbar css={styles.navbar} />

        <div css={styles.body}>
          <div style={{ height: 48 }} />

          <Container maxWidth="md">
            <h3 css={styles.heading}>
              Products {category ? ` / ${category.name}` : null}
            </h3>

            <div css={styles.products}>
              {products.map((product) => (
                <ProductVertical key={product._id} product={product} />
              ))}
            </div>
          </Container>

          <div style={{ height: 96 }} />
        </div>

        <Footer css={styles.footer} />
      </div>
    </>
  )
}

interface PageProductsProps {
  category?: BaseCategory
  products: BaseProduct[]
}

const useStyles = makeStyles((props: PageProductsProps) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  heading: {
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 24,
  },
  navbar: {
    flexShrink: 1,
  },
  body: {
    flexGrow: 1,
  },
  footer: {
    flexShrink: 1,
  },
  products: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
  },
}))

const GET_CATEGORY_PRODUCTS = gql`
  query ($categoryId: String!) {
    category(_id: $categoryId) {
      _id
      name {
        en
      }
    }

    products(categoryId: $categoryId) {
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
  }
`

const GET_PRODUCTS = gql`
  query {
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
  }
`

export const getServerSideProps: GetServerSideProps<PageProductsProps> = async (
  ctx
) => {
  const categoryId = ctx.query.categoryId as string | undefined

  const data = await graphqlReq(
    categoryId ? GET_CATEGORY_PRODUCTS : GET_PRODUCTS,
    categoryId ? { categoryId } : {}
  )

  return {
    props: {
      category: data.category
        ? {
            ...data.category,
            name: data.category.name.en,
          }
        : null,
      products: data.products.map((product: any) => ({
        ...product,
        name: product.name.en,
        availableSpecs: product.availableSpecs.en,
      })),
    },
  }
}
