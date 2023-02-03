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
    offerPrices: { en: '', es: '' },
    thumbnail: '',
    gallery: [],
    specs: [
      {
        name: { en: 'Variety', es: '' },
        value: { en: '', es: '' },
      },
      {
        name: { en: 'Cultivation Type', es: '' },
        value: { en: '', es: '' },
      },
      {
        name: { en: 'Processing Type', es: '' },
        value: { en: '', es: '' },
      },
      {
        name: { en: 'Grade', es: '' },
        value: { en: '', es: '' },
      },
      {
        name: { en: 'Packaging', es: '' },
        value: { en: '', es: '' },
      },
      {
        name: { en: 'Size', es: '' },
        value: { en: '', es: '' },
      },
      {
        name: { en: 'Certification', es: '' },
        value: { en: '', es: '' },
      },
    ],
    availableSpecs: { en: '', es: '' },
    traces: [
      {
        type: 'field',
        description: { en: '', es: '' },
        gallery: [],
      },
      {
        type: 'packing',
        description: { en: '', es: '' },
        gallery: [],
      },
      {
        type: 'finalProduct',
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
