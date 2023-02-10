
import { BaseCategory, BaseProduct, graphqlReq, ProductsPage } from 'common'
import { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

interface PageProductsProps {
  category: BaseCategory
  products: BaseProduct[]
}

export default function PageProducts(props: PageProductsProps) {
  const { products, category } = props

  return <ProductsPage products={products} category={category} />
}

const GET_CATEGORY_PRODUCTS = gql`
  query ($categoryId: String!) {
    category(_id: $categoryId) {
      _id
      name {
        en
      }
    }

    products(categoryId: $categoryId, descCreatedAt: true) {
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

export const getStaticProps: GetStaticProps<PageProductsProps> = async (
  ctx
) => {
  const categoryId = ctx.params?.categoryId as string

  const data = await graphqlReq(GET_CATEGORY_PRODUCTS, { categoryId })

  return {
    props: {
      category: {
        ...data.category,
        name: data.category.name.en,
      },
      products: data.products.map((product: any) => ({
        ...product,
        name: product.name.en,
        availableSpecs: product.availableSpecs.en,
      })),
    },
  }
}

const GET_CATEGORIES = gql`
  query {
    categories {
      _id
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const { categories } = await graphqlReq(GET_CATEGORIES)

  const paths = categories.map((category: any) => ({
    params: { categoryId: category._id },
  }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}
