import { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'
import { BaseProduct } from '../types'
import { Container } from '../ui'
import { makeStyles } from '../utils'
import { Product } from './Product'
import connectedDots from '../assets/images/connected-dots.png'

interface ProductsOverviewProps extends HTMLAttributes<HTMLDivElement> {
  products: BaseProduct[]
}

export const ProductsOverview: FC<ProductsOverviewProps> = (props) => {
  const styles = useStyles(props)

  const { products, ...divProps } = props

  return (
    <div css={styles.wrapper} {...divProps}>
      <div css={styles.imgWrapper}>
        <img src={connectedDots.src} />
      </div>

      <Container maxWidth="md">
        <h4 css={styles.heading} style={{ marginBottom: 34 }}>
          DEAL OPPORTUNITIES
        </h4>

        <div css={styles.root}>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  )
}

const useStyles = makeStyles((props: ProductsOverviewProps) => ({
  wrapper: {
    position: 'relative',
    zIndex: -1,
    width: '100%',
  },
  imgWrapper: {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 0,
    overflow: 'hidden',
    zIndex: -1,
    pointerEvents: 'none',
  },
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 40,

    [`@media (max-width: ${theme.widths.tablet})`]: {
      gridTemplateColumns: '1fr',
      maxWidth: 600,
      width: '100%',
      margin: '0 auto',
    },
  },
  heading: {
    fontWeight: 700,
    fontSize: 30,
    lineHeight: 1.25,
    textAlign: 'center',
    color: '#69832C',
  },
}))
