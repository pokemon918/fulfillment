import { countries } from '../data'
import { useUser } from '../hooks'
import { ArrowBackIcon } from '../icons'
import { theme } from '../theme'
import { DetailedInvestment, DetailedProduct } from '../types'
import { Button, Progress } from '../ui'
import { makeStyles } from '../utils'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC, HTMLAttributes, useMemo } from 'react'
import { ExcerptGallery } from './ExcerptGallery'
import { MonthsRange } from './MonthsRange'

interface ProductItem extends DetailedProduct {
  type: 'product'
}

interface InvestmentItem extends DetailedInvestment {
  type: 'investment'
}

interface ItemIntroProps extends HTMLAttributes<HTMLDivElement> {
  gallery: string[]
  item: ProductItem | InvestmentItem
  onClickGetQuote: () => void
}

export const ItemIntro: FC<ItemIntroProps> = (props) => {
  const user = useUser()
  const styles = useStyles(props)

  const { gallery, item, onClickGetQuote, ...divProps } = props

  const countryName = useMemo(
    () => countries.find((c) => c.code === item.country)?.name,
    [item.country]
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
            href={`/${item.type}s/${item._id}/update`}
          >
            Update
          </Button>
        )}
      </div>

      <div css={styles.root}>
        <ExcerptGallery productId={item._id} gallery={gallery.slice(0, 5)} />

        <div>
          <h2 css={styles.title}>
            {countryName} - {item.name}
          </h2>

          <p css={styles.subtitle}>HS Code: {item.hsCode}</p>

          {item.type === 'product' ? (
            <h3 style={{ marginTop: 46 }} css={styles.price}>
              ${item.price} ~
            </h3>
          ) : (
            <div style={{ marginTop: 26 }}>
              <Progress
                css={styles.progress}
                value={Math.round((item.paidAmount / item.goalAmount) * 100)}
              />

              <p css={styles.remainPrice}>$ {item.paidAmount}</p>

              <p css={styles.goalPrice}>pledged of ${item.goalAmount} goal</p>
            </div>
          )}

          {item.type === 'product' ? (
            <p css={styles.unitPhrase}>
              USD / KG, {dayjs(item.updatedAt).format('MMMM DD, YYYY')}
            </p>
          ) : (
            <div style={{ marginBottom: 26 }}>
              <p css={styles.smallDetail}>
                <span>Estimated Return:</span> <b>{item.estimatedReturn}</b>
              </p>
              <p css={styles.smallDetail}>
                <span>Supporters:</span> <b>{item.supporters}</b>
              </p>
              <p css={styles.smallDetail}>
                <span>Final Date:</span> <b>{item.finalDate}</b>
              </p>
            </div>
          )}

          <h4 css={styles.offerTitle}>Current Offer Base Prices</h4>

          <div css={styles.offersWrapper}>
            <div css={styles.offers}>
              {item.offerPrices.map((offer, idx) => (
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
            style={{ marginBottom: 36, maxWidth: 200 }}
            picked={item.harvestingMonths}
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

const useStyles = makeStyles(({ item: { type } }: ItemIntroProps) => ({
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
    marginBottom: 46,
  },
  smallDetail: {
    fontSize: 14,
    marginBottom: 4,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '> span': {
      flexShrink: 0,
      marginRight: 4,
    },
    '> b': {
      flexShrink: 0,
      color: '#b0d950',
      fontSize: 14,
    },
  },
  offerTitle: {
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 16,
  },
  offersWrapper: {
    width: '100%',
    marginBottom: type === 'product' ? 46 : 26,
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
  progress: {
    marginBottom: 8,
  },
  remainPrice: {
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1.25,
    color: 'var(--color-primary)',
  },
  goalPrice: {
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 1.25,
    color: 'rgba(5, 5, 5, 0.5)',
    marginBottom: 24,
  },
}))
