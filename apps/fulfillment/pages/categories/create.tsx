import {
  CategoryForm,
  CategoryFormValue,
  Container,
  PageLayout,
  withAuth,
} from 'common'

const ProductCreate = () => {
  const defaultValues: CategoryFormValue = {
    name: { en: '', es: '' },
    thumbnail: '',
  }

  return (
    <PageLayout>
      <Container maxWidth="md">
        <CategoryForm defaultValues={defaultValues} actionType="create" />
      </Container>
    </PageLayout>
  )
}

export default withAuth(ProductCreate, 'admin')
