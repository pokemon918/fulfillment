import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'
import { BaseProduct } from '../types'
import { Button, CountryLabel } from '../ui'
import { makeStyles, mergeProps } from '../utils'
import rightangle from '../assets/images/right_angle.png'

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

  const splittedSpecs = product.availableSpecs.split("/")
  const type = splittedSpecs[0]?.trim()
  const quality = splittedSpecs[1]?.trim()
  const size = splittedSpecs[2].split(':')[1]?.trim();



  return (
    <Link href={`/products/${product._id}`} css={styles.mainContainer} {...anchorProps}>
      {product.isSustainable && <span css={styles.susTitle}>Sustainable Product</span>}
      <div css={styles.root}>
        <div css={product.isSustainable ? styles.productSusContainer : styles.productMainContainer}>
          <div css={styles.productImageContainer}>
            <div
              css={styles.imgBackground}
              style={{ backgroundImage: `url(${product.thumbnail})` }}
            />
          </div>

          <div css={styles.productHeadlineContainer}>
            <div css={styles.productNameContainer}>
              <h3 css={styles.heading}>{product.name}</h3>
            </div>
            <div css={styles.productFlagContainer}>
              <CountryLabel css={styles.flag} countryCode={product.country} noName={true} />
            </div>
          </div>

          <div css={styles.productSpecsContainer}>
            <div css={styles.typeContainer}>
              <p css={styles.type} style={{ fontWeight: '200' }}>Type</p>
              <p css={styles.typeValue} style={{ fontWeight: 'bold' }}>{type.toUpperCase()}</p>
            </div>
            <div css={styles.qualityContainer}>
              <p css={styles.type} style={{ fontWeight: '200' }}>Quality</p>
              <p css={styles.typeValue} style={{ fontWeight: 'bold' }}>{quality?.split(' ')?.[0].toUpperCase()}</p>
            </div>
            <div css={styles.sizeContainer}>
              <p css={styles.type} style={{ fontWeight: '200' }}>Size</p>
              <p css={styles.typeValue} style={{ fontWeight: 'bold' }}>{size}</p>
            </div>
          </div>

          <div css={styles.detailsContainer}>
            <div css={styles.priceContainer}>
              <span css={styles.priceVal}>${product.price}</span>
              <p css={styles.priceDesc}>per lb (Pound)</p>
            </div>
            <div css={styles.moreContainer}>
              <span style={{ display: 'inline-flex' }}>In details<img css={styles.angle} src={rightangle.src} /></span>
            </div>
          </div>
        </div>
      </div>
      {/* <div
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

        <Button style={{ minWidth: 146 }}>See Details</Button>
      </div> */}
    </Link>
  )
}

const useStyles = makeStyles(
  ({ horizontal, bordered, imgHeight }: ProductProps) => ({
    mainContainer: {
      position: 'relative',
      paddingTop: 40,
      textDecoration: 'none',
    },
    root: {
      zIndex: 300,
      transform: 'translateZ(10px)',
      width: '100%',
      display: 'block',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.8fr)',
      border: '1px solid #E9E9E9',
      borderRadius: 16,
      background: '#fff',
      fontWeight: 500,
      overflow: 'hidden',
      color: '#000',
      [`@media (max-width: ${theme.widths.tabletXs})`]: {
        maxWidth: 300,
        gridTemplateColumns: 'minmax(0, 1fr)',
        margin: '0 auto',
      },
    },
    productMainContainer: {
      width: '100%',
    },
    productSusContainer: {
      borderTop: '10px solid #B1DA50',
    },
    susTitle: {
      position: 'absolute',
      top: 0,
      fontSize: 28,
      fontWeight: 500,
      textAlign: 'left',
      color: '#B1DA50',
    },
    productImageContainer: {
      width: '90%',
      margin: 'auto',
      height: '250px',
      marginTop: '20px',
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
    productHeadlineContainer: {
      width: '90%',
      margin: 'auto',
      display: 'flex',
      marginTop: '20px',
      marginBottom: '20px',
      [`@media (max-width: ${theme.widths.tabletXs})`]: {
        marginTop: '70px'
      }
    },
    productNameContainer: {
      width: '88%',
      paddingTop: '8px'
    },
    productFlagContainer: {
      width: '15%',
      paddingTop: '13px',
      background: '#f5f2f2',
      textAlign: 'center',
      paddingLeft: '5px',
    },
    productSpecsContainer: {
      width: '100%',
      display: 'flex',
      borderBottom: '1px solid #CFCFCF',
      borderTop: '1px solid #CFCFCF',
    },
    typeContainer: {
      width: '33.3%',
      textAlign: 'center',
      borderRight: '1px solid #CFCFCF',
    },
    qualityContainer: {
      width: '33.4%',
      textAlign: 'center',
      borderRight: '1px solid #CFCFCF',
    },
    sizeContainer: {
      width: '33.3%',
      textAlign: 'center'
    },
    type: {
      color: '#808673',
      margin: '10px 0px'
    },
    typeValue: {
      color: '#69832C',
      marginBottom: 10,
    },
    detailsContainer: {
      width: '100%',
      display: 'flex',
    },
    priceContainer: {
      width: '60%',
      paddingLeft: '20px !important',
      fontWeight: 'bold',
      padding: '20px 0px',
    },
    moreContainer: {
      width: '40%',
      textAlign: 'center',
      paddingTop: '30px !important',
      background: '#B1DA50',
      padding: '20px 0px'
    },
    angle: {
      marginLeft: '10px',
      objectFit: 'contain'
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
      fontWeight: 'bold',
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
      color: '#808673',
      marginRight: 4,
    },
    priceDesc: {
      fontSize: 13,
      color: '#808673',
    },
  })
)
