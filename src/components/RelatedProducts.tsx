import theme from '@/theme'
import { BaseProduct } from '@/types/product'
import Container from '@/ui/Container'
import ScrollView from '@/ui/ScrollView'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'
import ProductVertical from './ProductVertical'

interface RelatedProductsProps extends HTMLAttributes<HTMLDivElement> {
  products: BaseProduct[]
}

const RelatedProducts: FC<RelatedProductsProps> = (props) => {
  const styles = useStyles(props)

  const { products, ...divProps } = props

  return (
    <ScrollView
      maxWidth="md"
      endBlur="linear-gradient(269.92deg, #f8f8f8 0.05%, rgb(248 248 248 / 0%) 99.9%)"
      children={
        <div css={styles.products}>
          {[...products, ...products, ...products].map((product, idx) => (
            <ProductVertical
              css={styles.product}
              key={product._id + idx}
              product={product}
            />
          ))}

          <div css={styles.emptyProduct} />
        </div>
      }
      render={({ deskArrows, mobileArrows, scrollView }) => (
        <div {...divProps}>
          <Container maxWidth="md">
            <div css={styles.header}>
              <h2 css={styles.title}>Other Related Products</h2>

              {deskArrows}
            </div>
          </Container>

          {scrollView}

          {mobileArrows}
        </div>
      )}
    />
  )
}

const useStyles = makeStyles(({}: RelatedProductsProps) => ({
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 56,
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  title: {
    fontSize: 30,
  },
  products: {
    height: 'auto',
    display: 'flex',
    padding: '0 16px',
    fontFamily: theme.fonts.primary,
  },
  product: {
    flexShrink: 0,
    width: 258,
    marginRight: 18,
    [`@media (max-width: ${theme.widths.mobileSm})`]: {
      width: 'calc(100% - 32px)',
    },
  },
  emptyProduct: {
    width: 28,
    flexShrink: 0,
  },
}))

export default RelatedProducts
