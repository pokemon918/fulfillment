export interface BaseProduct {
  _id: string;
  name: string;
  thumbnail: string;
  country: string;
  price: string;
  categoryId: string;
  availableSpecs: string;
}

export interface DetailedProduct extends BaseProduct {
  gallery: string[]
}

