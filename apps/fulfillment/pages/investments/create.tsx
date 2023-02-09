import {
  Container,
  InvestmentForm,
  InvestmentFormValue,
  PageLayout,
  ProductForm,
  withAuth,
} from 'common'

const ProductCreate = () => {
  const defaultValues: InvestmentFormValue = {
    name: { en: '', es: '' },
    country: 'PE',
    hsCode: { en: '', es: '' },
    goalAmount: '',
    paidAmount: '',
    estimatedReturn: '',
    supporters: '',
    finalDate: '',
    bigTitle: { en: '', es: '' },
    description: { en: '', es: '' },
    offerPrices: [],
    thumbnail: '',
    gallery: [],
    specs: [],
    harvestingMonths: [],
    availableSpecs: { en: '', es: '' },
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
  }

  return (
    <PageLayout>
      <Container maxWidth="md">
        <InvestmentForm defaultValues={defaultValues} actionType="create" />
      </Container>
    </PageLayout>
  )
}

export default withAuth(ProductCreate, 'admin')
