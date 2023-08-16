import {
    Container,
    BuyerCompanyFormValue,
    CompanyForm
  } from 'common'
  
  const buyerCompanyCreate = () => {
    const defaultValues: BuyerCompanyFormValue = {
      _id: '',
      name: { en: '', es: '' },
      TaxID: '',
      size: '1-50',
      Country: 'CA',
      Phone: '',
      email: '',
      website: '',
      type: 'Importer',
      status: 'pending',
      POC: '',
      interestProductIds: [],
      yearImportVolume: 0,
      yearImportCFR: 0,
      preferredPaymentTerm: '',
      fulfillmentOrigin: 'South and Central America',
      certifications: [],
      financialScore: 0
    }
  
    return (
      <Container maxWidth="md">
        <CompanyForm defaultValues={defaultValues} actionType="create" />
      </Container>
    )
  }
  
  export default buyerCompanyCreate
  