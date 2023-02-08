
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { BaseProduct } from '../types'
import { BoxRation, Button, CountryLabel } from '../ui'
import { makeStyles, mergeProps } from '../utils'

interface ProductProps extends HTMLAttributes<HTMLAnchorElement> {
  product: BaseProduct
}

export const ProductVertical: FC<ProductProps> = (originalProps) => {
  const props = mergeProps(originalProps, {})

  const styles = useStyles(props)

  const { product, ...anchorProps } = props

  return (
    <Link href={`/products/${product._id}`} css={styles.root} {...anchorProps}>
      <BoxRation
        css={styles.imgWrapper}
        ration={1}
        style={{ backgroundImage: `url(${product.thumbnail})` }}
      />

      <div css={styles.body}>
        <h3 css={styles.heading}>{product.name}</h3>

        <CountryLabel css={styles.flag} countryCode={product.country} />

        <div css={styles.specs}>
          <p css={styles.specsTitle}>AVAILABLE SPECS</p>
          <p css={styles.specsDesc}>{product.availableSpecs}</p>
        </div>

        <div css={styles.price}>
          <p>
            <span css={styles.priceCurrency}>USD</span>
            <span css={styles.priceVal}>{product.price} ~</span>
          </p>
          <p css={styles.priceDesc}>per lb (Pound)</p>
        </div>

        <Button style={{ minWidth: 146 }}>See Details</Button>
      </div>
    </Link>
  )
}

const useStyles = makeStyles(({}: ProductProps) => ({
  root: {
    position: 'relative',
    zIndex: 300,
    transform: 'translateZ(10px)',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    border: 'none',
    borderRadius: 0,
    fontWeight: 500,
    overflow: 'hidden',
    color: '#000',
    textDecoration: 'none',
  },
  imgWrapper: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '18px 0 0',
    alignItems: 'start',
  },
  heading: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 6,
  },
  flag: {
    marginBottom: 12,
    fontWeight: 500,
  },
  flagIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  specs: {
    color: 'rgba(5, 5, 5, 0.5)',
    marginBottom: 16,
  },
  specsTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#000',
  },
  specsDesc: {
    fontSize: 13,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  price: {
    marginBottom: 13,
  },
  priceVal: {
    fontSize: 25,
  },
  priceCurrency: {
    fontSize: 13,
    color: 'rgba(5, 5, 5, 0.5)',
    marginRight: 4,
  },
  priceDesc: {
    fontSize: 13,
    color: 'rgba(5, 5, 5, 0.3)',
  },
}))

