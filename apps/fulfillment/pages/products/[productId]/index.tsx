import {
  BaseProduct,
  Container,
  DetailedProduct,
  Faq,
  Footer,
  gql,
  graphqlReq,
  makeStyles,
  Navbar,
  NoSSR,
  PageBgColor,
  ProductInfo,
  ItemIntro,
  QuotePrompt,
  QuoteSticky,
  RelatedProducts,
  theme,
  faqs,
} from 'common'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FC, useState } from 'react'

interface ProductPageProps {
  product: DetailedProduct
  relatedProducts: BaseProduct[]
  userProfile?: {
    fullName: string
    companyName: string
    email: string
    phone: string
  }
}

const ProductPage: FC<ProductPageProps> = (props) => {
  const { product, relatedProducts, userProfile } = props

  const styles = useStyles(props)
  const [openQuote, setOpenQuote] = useState(false)

  return (
    <div css={styles.root}>
      <PageBgColor bgColor="#f8f8f8" />
      <Navbar style={{ marginBottom: 72 }} />

      <Container style={{ marginBottom: 100 }} maxWidth="md">
        <ItemIntro
          style={{ marginBottom: 120 }}
          gallery={product.gallery}
          item={{ type: 'product', ...product }}
          onClickGetQuote={() => setOpenQuote(true)}
        />

        <ProductInfo product={product} />
      </Container>

      <RelatedProducts
        products={relatedProducts}
        style={{ marginBottom: 122, marginTop: 120 }}
      />

      <Container style={{ marginBottom: 100 }} maxWidth="sm">
        <Faq faqs={faqs.dealProductFaqs} />
      </Container>

      <Footer />

      <NoSSR>
        <div css={{ display: openQuote ? undefined : 'none' }}>
          <QuotePrompt
            product={product}
            onClose={() => setOpenQuote(false)}
            userProfile={userProfile}
          />
        </div>
      </NoSSR>

      <QuoteSticky onClickGetQuote={() => setOpenQuote(true)} />
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
      offerPrices {
        name {
          en
        }

        value {
          en
        }
      }
      availableSpecs {
        en
      }
      hsCode {
        en
      }
      harvestingMonths
      gallery
      traces {
        title {
          en
          es
        }
        gallery
        description {
          en
        }
      }
      updatedAt

      category {
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
    }
  }
`

export const getStaticProps: GetStaticProps<ProductPageProps> = async (ctx) => {
  const productId = ctx.params?.productId as string

  const { product } = await graphqlReq(GET_DATA, { productId })

  if (!product) {
    return {
      notFound: true,
      revalidate: 60
    }
  }

  return {
    props: {
      product: {
        ...product,
        name: product.name.en,
        availableSpecs: product.availableSpecs.en,
        hsCode: product.hsCode.en,
        traces: product.traces.map((trace: any) => ({
          ...trace,
          title: trace.title.en,
          description: trace.description.en,
        })),
        offerPrices: product.offerPrices.map((offerPrice: any) => ({
          ...offerPrice,
          name: offerPrice.name.en,
          value: offerPrice.value.en,
        })),
      },
      relatedProducts: product.category.products
        .filter((p: any) => p._id !== product._id)
        .map((product: any) => ({
          ...product,
          name: product.name.en,
          availableSpecs: product.availableSpecs.en,
        })),
    },
    revalidate: 60
  }
}

const GET_PRODUCTS = gql`
  query {
    products {
      _id
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const { products } = await graphqlReq(GET_PRODUCTS)

  const paths = products.map((product: any) => ({
    params: { productId: product._id },
  }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export default ProductPage
