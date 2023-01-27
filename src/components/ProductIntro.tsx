import countries from '@/data/countries'
import { DetailedProduct } from '@/types/product'
import Button from '@/ui/Button'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, useMemo } from 'react'
import Gallery from './Gallery'

interface ProductIntroProps extends HTMLAttributes<HTMLDivElement> {
  gallery: string[]
  product: DetailedProduct
}

const offers = [
  { name: 'Grade: No.1', value: '$6 / kg' },
  { name: 'Cat1 - 2kg box', value: '$7.75 / kg' },
]

const ProductIntro: FC<ProductIntroProps> = (props) => {
  const styles = useStyles(props)

  const { gallery, product, ...divProps } = props

  const countryName = useMemo(
    () => countries.find((c) => c.code === product.country)?.name,
    [product.country]
  )

  return (
    <div css={styles.root} {...divProps}>
      <Gallery gallery={gallery} />
      <div>
        <h2 css={styles.title}>
          {countryName} - {product.name}
        </h2>

        <p css={styles.subtitle}>
          HS Code: 080810 - Fruit, edible; apples, fresh
        </p>

        <h3 css={styles.price}>$6 ~</h3>

        <p css={styles.unitPhrase}>USD / KG, November 7, 2022</p>

        <h4 css={styles.offerTitle}>Current Offer Base Prices</h4>

        <div css={styles.offers}>
          {offers.map((offer, idx) => (
            <div key={idx} css={styles.offer}>
              <span css={styles.offerName}>{offer.name}</span>
              <span css={styles.offerValue}>{offer.value}</span>
            </div>
          ))}
        </div>

        <Button fullWidth style={{ paddingTop: 12, paddingBottom: 12 }}>
          Get a Quote
        </Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles((props: ProductIntroProps) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr',
    gap: 60,
  },
  title: {
    fontSize: 34,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 46,
  },
  price: {
    fontSize: 30,
    marginBottom: 16,
  },
  unitPhrase: {
    fontSize: 14,
    marginBottom: 36,
  },
  offerTitle: {
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 24,
  },
  offers: {
    display: 'flex',
    marginBottom: 46,
    flexWrap: 'wrap'
  },
  offer: {
    padding: 12,
    backgroundColor: '#fff',
    flexShrink: 0,
    '&:not(:last-of-type)': {
      marginRight: 16,
    },
  },
  offerName: {
    fontSize: 14,
    marginRight: 12,
  },
  offerValue: {
    fontWeight: 700,
    fontSize: 16,
  },
}))

export default ProductIntro
