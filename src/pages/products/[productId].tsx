import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Gallery from '@/components/Gallery'
import ProductIntro from '@/components/ProductIntro'
import fonts from '@/theme/fonts'
import { BaseProduct, DetailedProduct } from '@/types/product'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import PageBgColor from '@/ui/PageBgColor'
import graphqlRequest from '@/utils/graphqlRequest'
import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import { GetServerSideProps } from 'next'
import { FC, useState } from 'react'
import RelatedProducts from '@/components/RelatedProducts'
import Faq from '@/components/Faq'
import Steps from '@/ui/steps/Steps'

interface ProductPageProps {
  product: DetailedProduct
  products: BaseProduct[]
}

const ProductPage: FC<ProductPageProps> = (props) => {
  const { product, products } = props
  const styles = useStyles(props)

  const [view, setView] = useState<'details' | 'gallery'>('details')

  return (
    <div css={styles.root}>
      <PageBgColor bgColor="#f8f8f8" />
      <Navbar style={{ marginBottom: 100 }} />

      <Container style={{ marginBottom: 100 }} maxWidth="md">
        <ProductIntro
          style={{ marginBottom: 120 }}
          gallery={product.gallery}
          product={product}
        />

        <div css={styles.toggleButtons}>
          <Button
            css={styles.toggleBtn}
            data-inactive={view !== 'details'}
            onClick={() => setView('details')}
          >
            Product Details
          </Button>
          
          <Button
            css={styles.toggleBtn}
            data-inactive={view !== 'gallery'}
            onClick={() => setView('gallery')}
          >
            Gallery
          </Button>
        </div>

        {view === 'gallery' && <Gallery gallery={product.gallery} />}

        {view === 'details' && (
          <>
            <h2 css={styles.heading}>Our Process from Farm to Buyer</h2>
            <Steps />
          </>
        )}
      </Container>

      <RelatedProducts
        products={products}
        style={{ marginBottom: 122, marginTop: 120 }}
      />

      <Container style={{ marginBottom: 100 }} maxWidth="sm">
        <Faq />
      </Container>

      <Footer />
    </div>
  )
}

const useStyles = makeStyles((props: ProductPageProps) => ({
  root: {
    fontFamily: fonts.secondary.style.fontFamily,
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    textAlign: 'center',
    color: '#B1DA50',
    marginBottom: 56,
  },
  toggleButtons: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 56,
  },
  toggleBtn: {
    padding: '10px 20px',
    minWidth: 'inherit',
    '&:not(:last-of-type)': {
      marginRight: 20,
    },
    '&[data-inactive="true"]': {
      background: '#fff',
      color: '#434343',
    },
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
