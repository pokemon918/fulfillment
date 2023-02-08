import { BaseProduct } from '@/types/product'
import graphqlReq from '@/utils/graphqlReq'
import { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'
import ProductsPage from '@/components/ProductsPage'

export default function PageProducts(props: PageProductsProps) {
  const { products } = props

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
    revalidate: 10,
  }
}
