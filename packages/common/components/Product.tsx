import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'
import { BaseProduct } from '../types'
import { Button, CountryLabel } from '../ui'
import { makeStyles, mergeProps } from '../utils'

interface ProductProps extends HTMLAttributes<HTMLAnchorElement> {
  product: BaseProduct
  horizontal?: boolean
  bordered?: boolean
  imgHeight?: number | string
}

export const Product: FC<ProductProps> = (originalProps) => {
  const props = mergeProps(originalProps, {
    horizontal: false,
    bordered: false,
    imgHeight: '100%',
  })

  const styles = useStyles(props)

  const { product, horizontal, bordered, imgHeight, ...anchorProps } = props

  return (
    <Link href={`/products/${product._id}`} css={styles.root} {...anchorProps}>
      <div
        css={styles.imgBackground}
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

        <Button>See Details</Button>
      </div>
    </Link>
  )
}

const useStyles = makeStyles(
  ({ horizontal, bordered, imgHeight }: ProductProps) => ({
    root: {
      position: 'relative',
      zIndex: 300,
      transform: 'translateZ(10px)',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.8fr)',
      border: '1px solid #CFCFCF',
      borderRadius: 16,
      fontWeight: 500,
      overflow: 'hidden',
      color: '#000',
      textDecoration: 'none',
      [`@media (max-width: ${theme.widths.tabletXs})`]: {
        maxWidth: 300,
        gridTemplateColumns: 'minmax(0, 1fr)',
        margin: '0 auto',
      },
    },
    imgBackground: {
      width: '100%',
      height: '100%',
      borderRadius: 16,
      overflow: 'hidden',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      [`@media (max-width: ${theme.widths.tabletXs})`]: {
        height: 'auto',
        width: '100%',
        '::before': {
          content: '""',
          display: 'block',
          width: '100%',
          paddingTop: `100%`,
        },
      },
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '20px 30px',
      minHeight: 290,
      alignItems: 'stretch',
      [`@media (max-width: ${theme.widths.tabletXs})`]: {
        padding: '20px 16px',
        minHeight: 'initial',
        alignItems: 'start',
      },
    },
    heading: {
      fontSize: 25,
      fontWeight: 500,
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
      width: '100%',
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
  })
)
