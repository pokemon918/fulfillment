import countries from '@/data/countries'
import { useUser } from '@/hooks/useUser'
import AddIcon from '@/icons/AddIcon'
import ArrowBackIcon from '@/icons/ArrowBackIcon'
import theme from '@/theme'
import { DetailedProduct } from '@/types/product'
import Button from '@/ui/Button'
import makeStyles from '@/utils/makeStyles'
import Link from 'next/link'
import { FC, HTMLAttributes, useMemo } from 'react'
import ExcerptGallery from '../ExcerptGallery'
import MonthsRange from '../MonthsRange'

interface ProductIntroProps extends HTMLAttributes<HTMLDivElement> {
  gallery: string[]
  product: DetailedProduct
  onClickGetQuote: () => void
}

const offers = [
  { name: 'Grade: No.1', value: '$6 / kg' },
  { name: 'Cat1 - 2kg box', value: '$7.75 / kg' },
]

const ProductIntro: FC<ProductIntroProps> = (props) => {
  const user = useUser()
  const styles = useStyles(props)

  const { gallery, product, onClickGetQuote, ...divProps } = props

  const countryName = useMemo(
    () => countries.find((c) => c.code === product.country)?.name,
    [product.country]
  )

  return (
    <div {...divProps}>
      <div css={styles.header}>
        <Link css={styles.back} href="/">
          <ArrowBackIcon style={{ marginRight: 6 }} />
          <span>Browse Market</span>
        </Link>

        {user?.role === 'admin' && (
          <Button
            variant="outlined"
            fullRounded
            href={`/products/${product._id}/update`}
          >
            Update
          </Button>
        )}
      </div>

      <div css={styles.root}>
        <ExcerptGallery gallery={gallery.slice(0, 5)} />

        <div>
          <h2 css={styles.title}>
            {countryName} - {product.name}
          </h2>

          <p css={styles.subtitle} style={{ marginBottom: 46 }}>
            HS Code: 080810 - Fruit, edible; apples, fresh
          </p>

          <h3 css={styles.price}>$6 ~</h3>

          <p css={styles.unitPhrase}>USD / KG, November 7, 2022</p>

          <h4 css={styles.offerTitle}>Current Offer Base Prices</h4>

          <div css={styles.offersWrapper}>
            <div css={styles.offers}>
              {offers.map((offer, idx) => (
                <div key={idx} css={styles.offer}>
                  <span css={styles.offerName}>{offer.name}</span>
                  <span css={styles.offerValue}>{offer.value}</span>
                </div>
              ))}
            </div>
          </div>

          <p css={styles.subtitle} style={{ marginBottom: 10 }}>
            Harvesting Seasonality
          </p>
          <MonthsRange
            style={{ marginBottom: 46, maxWidth: 200 }}
            picked={[0, 9, 10, 11]}
          />

          <Button
            fullWidth
            style={{ paddingTop: 12, paddingBottom: 12 }}
            onClick={onClickGetQuote}
          >
            Get a Quote
          </Button>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((props: ProductIntroProps) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'minmax(440px, 1fr) 1.4fr',
    gap: 60,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      gridTemplateColumns: '1fr',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  back: {
    color: '#000',
    textDecoration: 'none',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
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
  offersWrapper: {
    width: '100%',
    marginBottom: 46,
  },
  offers: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: -16,
    marginBottom: -8,
  },
  offer: {
    padding: 12,
    backgroundColor: '#fff',
    flexShrink: 0,
    marginRight: 16,
    marginBottom: 8,
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
