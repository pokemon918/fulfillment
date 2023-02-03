import PageLayout from '@/components/PageLayout'
import ProductForm, {
  ProductFormValue,
} from '@/components/product-form/ProductForm'
import withAuth from '@/hoc/withAuth'
import Container from '@/ui/Container'
import graphqlReq from '@/utils/graphqlReq'
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
      hsCode {
        en
        es
      }
      price
      bigTitle {
        en
        es
      }
      description {
        en
        es
      }
      offerPrices {
        en
        es
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
        type
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
  }, [])

  if (!product) return null

  return (
    <PageLayout>
      <Container maxWidth="md">
        <ProductForm defaultValues={product} actionType="update" />
      </Container>
    </PageLayout>
  )
}

export default withAuth(PageProductUpdate, 'admin')
