import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProductIntro from '@/components/ProductIntro'
import theme from '@/theme'
import { BaseProduct, DetailedProduct } from '@/types/product'
import Container from '@/ui/Container'
import PageBgColor from '@/ui/PageBgColor'
import graphqlRequest from '@/utils/graphqlRequest'
import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import { GetServerSideProps } from 'next'
import { FC, useState } from 'react'
import RelatedProducts from '@/components/RelatedProducts'
import Faq from '@/components/Faq'
import QuotePrompt from '@/components/quote-prompt'
import NoSSR from '@/components/NoSSR'
import QuoteSticky from '@/components/QuoteSticky'
import ProductInfo from '@/components/product-view/ProductInfo'

interface ProductPageProps {
  product: DetailedProduct
  products: BaseProduct[]
}

const ProductPage: FC<ProductPageProps> = (props) => {
  const { product, products } = props
  const styles = useStyles(props)
  const [openQuote, setOpenQuote] = useState(false)

  return (
    <div css={styles.root}>
      <PageBgColor bgColor="#f8f8f8" />
      <Navbar style={{ marginBottom: 72 }} />

      <Container style={{ marginBottom: 100 }} maxWidth="md">
        <ProductIntro
          style={{ marginBottom: 120 }}
          gallery={product.gallery}
          product={product}
          onClickGetQuote={() => setOpenQuote(true)}
        />

        <ProductInfo product={product} />
      </Container>

      <RelatedProducts
        products={products}
        style={{ marginBottom: 122, marginTop: 120 }}
      />

      <Container style={{ marginBottom: 100 }} maxWidth="sm">
        <Faq />
      </Container>

      <Footer />

      {/*<NoSSR>
        <QuotePrompt
          product={product}
          open={openQuote}
          onClose={() => setOpenQuote(false)}
        />
      </NoSSR>

      <QuoteSticky onClickGetQuote={() => setOpenQuote(true)} /> */}
    </div>
  )
}

const useStyles = makeStyles((props: ProductPageProps) => ({
  root: {
    fontFamily: theme.fonts.secondary,
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
      traces {
        type
        gallery
        description {
          en
        }
      }
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
        traces: product.traces.map((trace: any) => ({
          ...trace,
          description: trace.description.en,
        })),
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
