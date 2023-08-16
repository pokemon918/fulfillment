import { BaseCategory, BaseProduct, graphqlReq, CategoryPage } from 'common'
import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'

export default function AllCategories(props: AllCategoriesProps) {
  const { categories } = props

   return <CategoryPage categorys={categories} />
}

interface AllCategoriesProps {
    categories: BaseCategory[]
}

const GET_PRODUCTS = gql`
  query {
    categories {
        _id
        name {
          en
        }
        thumbnail
      }
  }
`

export const getStaticProps: GetStaticProps<AllCategoriesProps> = async () => {
  const data = await graphqlReq(GET_PRODUCTS)

  return {
    props: {
        categories: data.categories.map((category: any) => ({
            ...category,
            name: category.name.en,
          })),
    },
    revalidate: 60
  }
}
