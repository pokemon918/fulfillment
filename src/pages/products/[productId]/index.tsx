import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProductIntro from '@/components/product-view/ProductIntro'
import theme from '@/theme'
import { BaseProduct, DetailedProduct } from '@/types/product'
import Container from '@/ui/Container'
import PageBgColor from '@/ui/PageBgColor'
import graphqlReq, { graphqlServerReq } from '@/utils/graphqlReq'
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
import { getCookie } from '@/utils/cookies'

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
        <ProductIntro
          style={{ marginBottom: 120 }}
          gallery={product.gallery}
          product={product}
          onClickGetQuote={() => setOpenQuote(true)}
        />

        <ProductInfo product={product} />
      </Container>

      <RelatedProducts
        products={relatedProducts}
        style={{ marginBottom: 122, marginTop: 120 }}
      />

      <Container style={{ marginBottom: 100 }} maxWidth="sm">
        <Faq />
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

    userProfile {
      _id
      fullName
      companyName
      email
      phone
      role
    }
  }
`

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (
  ctx
) => {
  const { product, userProfile } = await graphqlServerReq(ctx, GET_DATA, {
    productId: ctx.query.productId,
  })

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
      userProfile,
      authUser: {
        _id: userProfile._id,
        fullName: userProfile.fullName,
        role: userProfile.role,
      },
    },
  }
}

export default ProductPage
