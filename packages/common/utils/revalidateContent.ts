import { revalidateCrossPaths } from './revalidate'

type ChangeAction = 'create' | 'update' | 'delete'

export const revalidateProduct = (
  product: { _id: string; categoryIds: (string | undefined)[] },
  action: ChangeAction
) => {
  const paths = {
    fulfillment: [
      '/',
      '/products',
      ...product.categoryIds.map((categoryId) =>
        categoryId ? `/categories/${categoryId}/products` : undefined
      ),
      `/products/${product._id}`,
    ],
    admin: [
      '/products',
      '/logs',
      ...product.categoryIds.map((categoryId) =>
        categoryId ? `/categories/${categoryId}/products` : undefined
      ),
      `/products/${product._id}`,
    ],
  }

  return revalidateCrossPaths(paths)
}

export const revalidateContract = (
  contract: { _id: string }
) => {
  const paths = {
    admin: [
      '/contracts',
      '/logs',
      `/contracts/${contract._id}`
    ],
    fulfillment: [
      '/contracts',
      `/contracts/${contract._id}`
    ]
  }

  return revalidateCrossPaths(paths)
}

export const revalidateInvestment = (
  product: { _id: string; categoryIds: (string | undefined)[] },
  action: ChangeAction
) => {
  const paths = {
    investment: [
      '/',
      '/investments',
      ...product.categoryIds.map((categoryId) =>
        categoryId ? `/categories/${categoryId}/investments` : undefined
      ),
      `/investments/${product._id}`,
    ],
    admin: [
      '/investments',
      ...product.categoryIds.map((categoryId) =>
        categoryId ? `/categories/${categoryId}/investments` : undefined
      ),
      `/investments/${product._id}`,
    ],
  }

  return revalidateCrossPaths(paths)
}

export const revalidateArticle = (
  article: { _id: string },
  action: ChangeAction
) => {
  const commonPaths = ['/', '/blog', `/blog/${article._id}`]

  const paths = {
    fulfillment: commonPaths,
    investment: commonPaths,
    admin: ['/blog', `/blog/${article._id}`, '/logs',],
  }

  return revalidateCrossPaths(paths)
}

export const revalidateCategory = (
  category: { _id: string },
  action: ChangeAction
) => {
  const commonPaths = ['/']

  const paths = {
    fulfillment: commonPaths,
    investment: commonPaths,
    admin: [...commonPaths, '/logs',],
  }

  return revalidateCrossPaths(paths)
}

export const revalidateCompany = (
  company: { _id: string },
  action: ChangeAction
) => {
  const paths = {
    admin: [
      '/company/buyers',
      '/logs',
      '/company/suppliers',
      `/company/${company._id}`
    ]
  }
  return revalidateCrossPaths(paths)
}

export const revalidateUser = (
  user: { _id: string },
  action: ChangeAction
) => {
  const paths = {
    admin: [
      '/users',
      '/logs',
      `/users/${user._id}`
    ]
  }
  return revalidateCrossPaths(paths)
}
