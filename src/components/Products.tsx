import { BaseProduct } from '@/types/product'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'
import Product from './Product'

interface ProductsProps extends HTMLAttributes<HTMLDivElement> {
  products: BaseProduct[]
}

const Products: FC<ProductsProps> = (props) => {
  const styles = useStyles(props)

  const { products, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      {products.slice(0, 4).map((product) => (
        <Product key={product._id} product={product} horizontal bordered />
      ))}
    </div>
  )
}

const useStyles = makeStyles((props: ProductsProps) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 40,
  },
}))

export default Products
