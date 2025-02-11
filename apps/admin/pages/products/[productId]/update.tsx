import {
  Container,
  graphqlReq,
  PageLayout,
  ProductForm,
  ProductFormValue,
  withAuth,
} from 'common'
import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const GET_PRODUCT = gql`
  query ($_id: String!) {
    product(_id: $_id) {
      _id
      name {
        en
        es
      }
      categoryId
      country
      harvestingMonths
      hsCode {
        en
        es
      }
      description {
        en
        es
      }
      price
      isSustainable
      bigTitle {
        en
        es
      }
      description {
        en
        es
      }
      offerPrices {
        name {
          en
          es
        }

        value {
          en
          es
        }
      }
      thumbnail
      gallery
      specs {
        name {
          en
          es
        }
        value {
          en
          es
        }
      }
      availableSpecs {
        en
        es
      }
      traces {
        title {
          en
          es
        }

        description {
          en
          es
        }
        gallery
      }
      certifications
    }
  }
`

const PageProductUpdate = () => {
  const router = useRouter()

  const productId = router.query.productId as string

  const [product, setProduct] = useState<ProductFormValue | null>(null)

  useEffect(() => {
    if (!router.isReady) return
    ;(async () => {
      const data = await graphqlReq(GET_PRODUCT, {
        _id: productId,
      })

      setProduct({
        ...data.product,
        price: Number(data.product.price),
        gallery: data.product.gallery.map((f: any) => ({ src: f })),
        traces: data.product.traces.map((trace: any) => ({
          ...trace,
          gallery: trace.gallery.map((f: any) => ({ src: f })),
        })),
        certifications: data.product.certifications.map((f: any) => ({
          src: f,
        })),
      })
    })()
  }, [router.isReady])

  return (
    <PageLayout>
      <Container maxWidth="md">
        {product ? (
          <ProductForm defaultValues={product} actionType="update" />
        ) : (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        )}
      </Container>
    </PageLayout>
  )
}

export default withAuth(PageProductUpdate, 'admin')
