import {
  CategoryForm,
  CategoryFormValue,
  Container,
  graphqlReq,
  PageLayout,
  withAuth,
} from 'common'
import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const GET_CATEGORY = gql`
  query ($_id: String!) {
    category(_id: $_id) {
      _id
      name {
        en
        es
      }

      thumbnail
    }
  }
`

const PageProductUpdate = () => {
  const router = useRouter()

  const categoryId = router.query.categoryId as string

  const [category, setCategory] = useState<CategoryFormValue | null>(null)

  useEffect(() => {
    ;(async () => {
      const data = await graphqlReq(GET_CATEGORY, {
        _id: categoryId,
      })

      setCategory(data.category)
    })()
  }, [])

  if (!category) return null

  return (
    <PageLayout>
      <Container maxWidth="md">
        <CategoryForm defaultValues={category} actionType="update" />
      </Container>
    </PageLayout>
  )
}

export default withAuth(PageProductUpdate, 'admin')
