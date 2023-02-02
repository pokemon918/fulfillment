export interface BasicUser {
  _id: string
  fullName: string
  role: 'admin' | 'buyer' | 'seller' | 'investor'
}

export interface DetailedUser extends BasicUser {
  companyName: string
  country: string
  email: string
  phone: string
}
