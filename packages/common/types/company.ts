export interface BaseCompany {
    _id: string
    name: string
    TaxID?: string
    size: '1-50' | '50-100' | '100-250' | 'more than 250'
    Country: string
    Phone: string
    email: string
    website?: string
  }
  
  export interface BaseBuyerCompany extends BaseCompany {
    type: 'Importer' | 'Wholesaler' | 'Processor' | 'Trader'
    POC: string
    status: 'approved' | 'pending'
  }
  
  export interface BaseSupplierCompany extends BaseCompany {
    type: 'Exporter' | 'Grower' | 'Processor' | 'Trader'
    PIC: string;
    status: 'approved' | 'pending' | 'verified'
  }

  export interface BuyerCompany extends BaseBuyerCompany {
    interestProductIds: string[]
    yearImportVolume?: number
    yearImportCFR?: number
    preferredPaymentTerm?: string
    fulfillmentOrigin: 'South and Central America' | 'Africa' | 'Europe' | 'Asia'
    certifications?: string[]
    financialScore?: number
  }

  export interface SupplierCompany extends BaseSupplierCompany {
    productIds: string[]
    yearExportVolume?: number
    yearFOBExport?: number
    preferredPaymentTerm?: string
    seasonality: ('January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December')[]
    mainMarket: 'North America' | 'Europe' | 'Asia'
    certifications?: string[]
    ownField: boolean
    ownPackingHouse: boolean
    industryRef?: string
  }