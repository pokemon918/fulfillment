export interface BasicUser {
  _id: string
  fullName: string
  role: 'admin' | 'buyer' | 'seller' | 'investor'
}
