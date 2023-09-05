export interface AuthUser {
  _id: string
  fullName: string
  role: 'admin' | 'buyer' | 'seller' | 'investor'
}

export interface BaseUser extends AuthUser {
  email: string
}

export interface DetailedUser extends BaseUser {
  companyName: string
  country: string
  phone: string
  commercialInfo?: { [k: string]: any }
}
