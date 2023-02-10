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
