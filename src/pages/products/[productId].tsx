import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProductIntro from '@/components/ProductIntro'
import RelatedProducts from '@/components/RelatedProducts'
import fonts from '@/theme/fonts'
import { BaseProduct, DetailedProduct } from '@/types/product'
import Container from '@/ui/Container'
import PageBgColor from '@/ui/PageBgColor'
import Steps from '@/ui/steps/Steps'
import graphqlRequest from '@/utils/graphqlRequest'
import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

interface ProductPageProps {
  product: DetailedProduct
  products: BaseProduct[]
}

const ProductPage: FC<ProductPageProps> = (props) => {
  const { product, products } = props
  const styles = useStyles(props)

  return (
    <div css={styles.root}>
      <PageBgColor bgColor="#f8f8f8" />
      {/* <Container style={{ paddingTop: 24,  }}> */}
      <Navbar style={{ marginBottom: 100 }} />
      {/* </Container> */}

      <Container style={{ marginBottom: 100 }} maxWidth="md">
        <ProductIntro style={{ marginBottom: 120 }} gallery={product.gallery} product={product} />

        <Steps />
      </Container>

      <RelatedProducts products={products} style={{ marginBottom: 162, marginTop: 120 }} />

      <Footer />
    </div>
  )
}

const useStyles = makeStyles((props: ProductPageProps) => ({
  root: {
    fontFamily: fonts.secondary.style.fontFamily,
  },
}))

const GET_DATA = gql`
  query ($productId: String!) {
    product(_id: $productId) {
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
      gallery
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
  }
`

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (
  ctx
) => {
  const { product, products } = await graphqlRequest(GET_DATA, {
    productId: ctx.query.productId,
  })

  return {
    props: {
      product: {
        ...product,
        name: product.name.en,
        availableSpecs: product.availableSpecs.en,
      },
      products: products.map((product: any) => ({
        ...product,
        name: product.name.en,
        availableSpecs: product.availableSpecs.en,
      })),
    },
  }
}

export default ProductPage
