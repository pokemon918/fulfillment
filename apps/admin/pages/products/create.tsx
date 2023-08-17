import {
  Container,
  PageLayout,
  ProductForm,
  ProductFormValue,
  withAuth,
} from 'common'

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
        title: { en: 'Field', es: '' },
        description: { en: '', es: '' },
        gallery: [],
      },
      {
        title: { en: 'Packing', es: '' },
        description: { en: '', es: '' },
        gallery: [],
      },
      {
        title: { en: 'Final Product', es: '' },
        description: { en: '', es: '' },
        gallery: [],
      },
    ],
    certifications: [],
    isSustainable: false,
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
