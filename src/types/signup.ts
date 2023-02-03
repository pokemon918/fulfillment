
export interface SignUpMainInfo {
  fullName: string
  companyName: string
  email: string
  password: string
  country: string
  phone: string
  role?: 'buyer' | 'seller'
}

export interface BuyerSignUpInfo extends SignUpMainInfo {
  role: 'buyer'
  commercialInfo: {
    fulfillmentProducts: string[]
    ownsFields: boolean
    ownsPackingHouse: boolean
    availableVolume: string
    fobExportPerYear: string
    certifications: string[]
    othersCertifications: string
  }
}

export interface SupplierSignupInfo extends SignUpMainInfo {
  role: 'seller'
  commercialInfo: {
    buyerType: string
    fulfillmentProducts: string[]
    fulfillmentCountries: string[]
    marketDestinations: string[]
    annualImportVolume: string
  }
}

export type SignUpInfo = BuyerSignUpInfo | SupplierSignupInfo
