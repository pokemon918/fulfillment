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
    <Container maxWidth="md">
      <CategoryForm defaultValues={defaultValues} actionType="create" />
    </Container>
  )
}

export default withAuth(ProductCreate, 'admin')
