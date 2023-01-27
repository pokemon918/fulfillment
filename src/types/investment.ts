export interface BaseInvestment {
  _id: string;
  name: string;
  thumbnail: string;
  country: string;
  goalAmount: number;
  paidAmount: number;
  categoryId: string;
  availableSpecs: string;
}
