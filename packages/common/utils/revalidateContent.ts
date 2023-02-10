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
      action !== 'delete' ? `/products/${product._id}` : undefined,
    ],
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
      action !== 'delete' ? `/investments/${product._id}` : undefined,
    ],
  }

  return revalidateCrossPaths(paths)
}

export const revalidateArticle = (
  article: { _id: string },
  action: ChangeAction
) => {
  const commonPaths = [
    '/',
    '/blog',
    action !== 'delete' ? `/blog/${article._id}` : undefined,
  ]

  const paths = {
    fulfillment: commonPaths,
    investment: commonPaths,
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
  }

  return revalidateCrossPaths(paths)
}
