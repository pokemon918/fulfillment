
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

  const { category, products } = await graphqlReq(GET_CATEGORY_PRODUCTS, { categoryId })

  if (!category) {
    return {
      notFound: true,
      revalidate: 60
    }
  }

  return {
    props: {
      category: {
        ...category,
        name: category.name.en,
      },
      products: products.map((product: any) => ({
        ...product,
        name: product.name.en,
        availableSpecs: product.availableSpecs.en,
      })),
    },
    revalidate: 60
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
