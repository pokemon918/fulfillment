import theme from '@/theme'
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
        <Product key={product._id} product={product} />
      ))}
    </div>
  )
}

const useStyles = makeStyles((props: ProductsProps) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 40,

    [`@media (max-width: ${theme.widths.tablet})`]: {
      gridTemplateColumns: '1fr',
      maxWidth: 600,
      width: '100%',
      margin: '0 auto'
    },
  },
}))

export default Products
