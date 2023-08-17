
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
        <div css={{width:'155px',height:'1px',background:'#B1E080',marginBottom:'8px'}}></div>

        <div css={styles.sustainableDiv}>
          <CountryLabel css={styles.flag} countryCode={product.country} />
          { product.isSustainable ? <div css={styles.sustainable}>Sustainable Product</div> : <></>}
        </div>

        <div css={styles.specs}>
          <p css={styles.specsTitle}>AVAILABLE SPECS:</p>
          <p css={styles.specsDesc}>{product.availableSpecs}</p>
        </div>

        <div css={styles.price}>
          <p>
            <span css={styles.priceCurrency}>USD</span>
            <span css={styles.priceVal}>{product.price} ~</span>
          </p>
          <p css={styles.priceDesc}>per lb (Pound)</p>
        </div>

        {/* <Button style={{ minWidth: 146 }}>See Details</Button> */}
        <button css={{ border: '0',
color: '#000',
fontWeight: '600',
fontSize: '14px',
padding: '14px 40px',
cursor: 'pointer',
borderRadius: '13px',
background: 'linear-gradient(271deg, #B1E183 0%, #B0D950 100%)'}}>See Details</button>
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
    fontSize: 25,
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 2,
  },
  flag: {
    marginBottom: '20px',
    fontWeight: 400,
    fontSize:'20px',
    '& i':{
      fontSize: '28px',
borderRadius: '5px'
    }
  },
  flagIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  specs: {
    color: 'rgba(5, 5, 5, 0.5)',
    marginBottom: '5px',
  },
  specsTitle: {
    fontSize: '15px',
fontWeight: '600',
color: '#000'
  },
  specsDesc: {
    fontSize: '15px',
    fontWeight: '400',
    color: '#000',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  price: {
    marginBottom: 13,
  },
  priceVal: {
    fontSize: '32px',
fontWeight: '600',
color: '#000'
  },
  priceCurrency: {
    fontSize: '15px',
color: '#646464',
marginRight: '4px',
fontWeight: '400'
  },
  priceDesc: {
    fontSize: '15px',
color: '#B4B4B4',
fontWeight: '400'
  },
  sustainable: {
    marginBottom: '17px',
    color: '#3BA83B',
    fontSize: '19px',
  },
  sustainableDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  }
}))

