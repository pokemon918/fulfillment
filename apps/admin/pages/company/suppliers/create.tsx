import {
    Container,
    SupplierCompanyFormValue,
    CompanyForm
  } from 'common'
  
  const supplierCompanyCreate = () => {
    const defaultValues: SupplierCompanyFormValue = {
      _id: '',
      name: { en: '', es: '' },
      TaxID: '',
      size: '1-50',
      Country: 'CA',
      Phone: '',
      email: '',
      website: '',
      type: 'Exporter',
      status: 'pending',
      PIC: '',
      productIds: [],
      yearExportVolume: 0,
      yearFOBExport: 0,
      preferredPaymentTerm: '',
      seasonality: ['January'],
      mainMarket: 'Europe',
      certifications: [],
      ownField: false,
      ownPackingHouse: false,
      industryRef: ''
    }
  
    return (
      <Container maxWidth="md">
        <CompanyForm defaultValues={defaultValues} actionType="create" />
      </Container>
    )
  }
  
  export default supplierCompanyCreate
  