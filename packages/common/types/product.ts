export interface BaseProduct {
  _id: string
  name: string
  thumbnail: string
  country: string
  price: number
  categoryId: string
  availableSpecs: string
  isSustainable: boolean
  description: string
}

export interface DetailedProduct extends BaseProduct {
  harvestingMonths: number[]
  hsCode: string
  description: string
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
}
