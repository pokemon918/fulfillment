export interface BaseProduct {
  _id: string
  name: string
  thumbnail: string
  country: string
  price: number
  categoryId: string
  availableSpecs: string
}

export interface DetailedProduct extends BaseProduct {
  hsCode: string
  gallery: string[]
  traces: {
    type: string
    description: string
    gallery: string[]
  }[]
  createdAt: string
}
