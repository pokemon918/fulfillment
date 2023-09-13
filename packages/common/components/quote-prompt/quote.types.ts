export interface PortData {
  shippingType: string;
  country: string;
  name: string;
}

export interface QuoteInput {
  company: string;
  name: string;
  email: string;
  phone: string;
  loadingPort: PortData;
  destinationPort: PortData;
  purchaseVolume: string;
  needs: string;
  paymentTerms: {
    placeholder?: string
    title: string
    paidPercent: string
  }[]
}

export interface QuoteProduct {
  _id: string
  name: string
  thumbnail: string
  country: string
  price: number
}
