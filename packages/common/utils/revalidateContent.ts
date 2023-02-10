import { revalidateCrossPaths } from "./revalidate";

type ChangeAction = 'create' | 'update' | 'delete'

export const revalidateProduct = (
  product: { _id: string; categoryId: string },
  action: ChangeAction
) => {
  const paths = {
    fulfillment: [
      '/',
      `/products`,
      `/categories/${product.categoryId}/products`,
      action !== 'delete' ? `/product/${product._id}` : undefined,
    ],
  }

  return revalidateCrossPaths(paths)
}