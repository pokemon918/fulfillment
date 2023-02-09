export interface BaseInvestment {
  _id: string;
  name: string;
  thumbnail: string;
  country: string;
  goalAmount: number;
  paidAmount: number;
}

export interface DetailedInvestment extends BaseInvestment {
  hsCode: string
  gallery: string[]
  traces: {
    title: string
    description: string
    gallery: string[]
  }[]
  offerPrices: {
    name: string
    value: string
  }[]
  updatedAt: string
  availableSpecs: string
  estimatedReturn: number
  supporters: number
  finalDate: string
  harvestingMonths: number[]
}
