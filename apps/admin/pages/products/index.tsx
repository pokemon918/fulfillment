import { BaseProduct, graphqlReq, ProductsPage } from 'common'
import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import { toast } from 'react-toastify'

export default function PageProducts(props: PageProductsProps) {
  const { products } = props
//toast("hello")
  return <ProductsPage products={products} />
}

interface PageProductsProps {
  products: BaseProduct[]
}

const GET_PRODUCTS = gql`
  query {
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
      isSustainable
    }
  }
`

export const getStaticProps: GetStaticProps<PageProductsProps> = async () => {
  const data = await graphqlReq(GET_PRODUCTS)

  return {
    props: {
      products: data.products.map((product: any) => ({
        ...product,
        name: product.name.en,
        availableSpecs: product.availableSpecs.en,
      })),
    },
    revalidate: 60
  }
}
