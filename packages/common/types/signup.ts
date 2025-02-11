export interface SignUpMainInfo {
  fullName: string
  companyName: string
  email: string
  password: string
  country: string
  phone: string
  website?: string
  role?: 'buyer' | 'seller' | 'investor' | 'admin'
}

export interface BuyerSignUpInfo extends SignUpMainInfo {
  role: 'buyer'
  commercialInfo: {
    buyerType: string[]
    fulfillmentProducts: string[]
    fulfillmentCountries: string[]
    marketDestinations: string[]
    annualImportVolume: string
  }
}

export interface SupplierSignupInfo extends SignUpMainInfo {
  role: 'seller'
  commercialInfo: {
    fulfillmentProducts: string[]
    ownsFields: boolean
    ownsPackingHouse: boolean
    availableVolume: string
    fobExportPerYear: string
    certifications: string[]
  }
}

export interface InvestorSignupInfo extends SignUpMainInfo {
  role: 'investor'
  commercialInfo: {
    investorSize: string
    address: string
    interestTicket: string
    additionalNotes: string
  }
}

export type SignUpInfo =
  | BuyerSignUpInfo
  | SupplierSignupInfo
  | InvestorSignupInfo
  | SignUpMainInfo
