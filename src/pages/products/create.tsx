import PageLayout from '@/components/PageLayout'
import ProductForm, {
  ProductFormValue,
} from '@/components/product-form/ProductForm'
import withAuth from '@/hoc/withAuth'
import Container from '@/ui/Container'

const ProductCreate = () => {
  const defaultValues: ProductFormValue = {
    name: { en: '', es: '' },
    country: 'PE',
    hsCode: { en: '', es: '' },
    price: '',
    bigTitle: { en: '', es: '' },
    description: { en: '', es: '' },
    offerPrices: [],
    thumbnail: '',
    gallery: [],
    specs: [],
    availableSpecs: { en: '', es: '' },
    harvestingMonths: [],
    traces: [
      {
        title: { en: 'field', es: '' },
        description: { en: '', es: '' },
        gallery: [],
      },
      {
        title: { en: 'packing', es: '' },
        description: { en: '', es: '' },
        gallery: [],
      },
      {
        title: { en: 'finalProduct', es: '' },
        description: { en: '', es: '' },
        gallery: [],
      },
    ],
    certifications: [],
  }

  return (
    <PageLayout>
      <Container maxWidth="md">
        <ProductForm defaultValues={defaultValues} actionType="create" />
      </Container>
    </PageLayout>
  )
}

export default withAuth(ProductCreate, 'admin')
