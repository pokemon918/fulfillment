import PageLayout from '@/components/PageLayout'
import CategoryForm, {
  CategoryFormValue,
} from '@/components/category-form/CategoryForm'
import withAuth from '@/hoc/withAuth'
import Container from '@/ui/Container'

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
