import { countries } from '../data'
import { useUser } from '../hooks'
import { ArrowBackIcon } from '../icons'
import { theme } from '../theme'
import { DetailedInvestment, DetailedProduct } from '../types'
import { Button, Progress, CountryLabel, ScrollView, Container } from '../ui'
import { makeStyles } from '../utils'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC, HTMLAttributes, useMemo } from 'react'
import { ExcerptGallery } from './ExcerptGallery'
import { MonthsRange } from './MonthsRange'
import kgImg from '../assets/images/kg.png'

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

      <div css={styles.megaContainer}>
        <div css={styles.scrollContainer}>
          <ScrollView
            maxWidth="md"
            endBlur="linear-gradient(269.92deg, #e7f4ca 0.05%, rgba(231, 244, 202, 0) 99.9%)"
            children={
              <div css={styles.categories}>
                {gallery.map((productImage, index) => (
                  <div key={index} css={styles.product}><img src={productImage} style={{ borderRadius: '10px', width: '100%', objectFit: 'contain' }} /></div>
                ))}

                <div css={styles.emptyBox} />
              </div>
            }
            render={({ deskArrows, mobileArrows, scrollView }) => (
              <div css={styles.wrapper} {...divProps}>
                <div css={styles.sliderStyle}>
                  {scrollView}

                  <div style={{ textAlign: 'right', marginTop: '50px' }}>
                    {deskArrows}
                  </div>

                  {mobileArrows}
                </div>
              </div>
            )}
          />

          <div style={{ marginTop: '-100px', height: 'auto', marginLeft: '20px' }}>
            {item.traces.map((item) => {
              return <div>
                <img src={item.gallery[0]} style={{ width: '100%', objectFit: 'contain' }} />
                <h2 style={{ margin: '10px 0px', fontWeight: 'normal' }}>{item.title}</h2>
                <p css={styles.subtitle} style={{ marginBottom: '20px' }}>{item.description}</p>
              </div>
            })}
          </div>
        </div>

        <div css={styles.detailsMainContainer}>
          <div css={styles.headerContainer}>
            <p css={styles.subtitle}>HS Code: {item.hsCode}</p>
            <h2 css={styles.title}>
              {countryName} - {item.name}
            </h2>
            <p css={styles.subtitle}>Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum</p>
          </div>

          <div css={styles.specsContainer}>
            <div css={styles.priceContainer}>
              {item.type === 'product' ? (
                <div>
                  <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '10px' }}>Price</p>
                  <h3 style={{ marginTop: 0 }} css={styles.price}>
                    ${item.price} ~
                  </h3>
                </div>
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
                  / USD / KG, {dayjs(item.updatedAt).format('MMMM DD, YYYY')}
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
            </div>
            <div css={styles.originContainer}>
              <p style={{ fontWeight: 'bold', fontSize: '12px' }}>Origin: Peru</p>
              <div css={styles.flagHolder}>
                <CountryLabel countryCode={'US'} noName />
              </div>
            </div>
          </div>

          <div css={styles.offerContainer}>
            <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '10px' }}>Current Offer Base Prices</p>

            <div css={styles.kgBoxes}>
              <div css={styles.gradeBox}>
                <p css={styles.subtitle}>Grade: No.1</p>
                <div css={styles.gradeDetailContainer}>
                  <img src={kgImg.src} style={{ marginRight: '5px' }} />
                  <p style={{ fontWeight: 'bold', fontSize: '12px', paddingTop: '5px' }}>$6/kg</p>
                </div>
              </div>
              <div css={styles.catBox}>
                <p css={styles.subtitle}>Cat1 - 2kg box</p>
                <div css={styles.catDetailContainer}>
                  <img src={kgImg.src} style={{ marginRight: '5px' }} />
                  <p style={{ fontWeight: 'bold', fontSize: '12px', paddingTop: '5px' }}>$6/kg</p>
                </div>
              </div>
            </div>
          </div>

          <div css={styles.harvestingContainer}>
            <div style={{ padding: '20px' }}>
              <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '10px' }}>
                Harvesting Seasonality
              </p>

              <MonthsRange
                style={{ marginBottom: 36 }}
                picked={item.harvestingMonths}
              />
            </div>

            <Button
              fullWidth
              style={{ fontWeight: 'bold', paddingTop: 12, paddingBottom: 12, borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}
              onClick={onClickGetQuote}
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ item: { type } }: ItemIntroProps) => ({
  megaContainer: {
    display: 'flex',
    width: '100%',
    marginTop: '100px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'inline-block',
      marginTop: '0px',
    },
  },
  scrollContainer: {
    width: '50%',
    paddingRight: '20px',
    height: '604px',
    overflowY: 'scroll',
    '::-webkit-scrollbar': {
      width: '5px'
    },
    /* Track */
    '::-webkit-scrollbar-track': {
      background: '#f8f8f8'
    },

    /* Handle */
    '::-webkit-scrollbar-thumb': {
      background: '#B1DA50'
    },

    /* Handle on hover */
    '::-webkit-scrollbar-thumb:hover': {
      background: '#B1DA50'
    },
    [`@media (max-width: ${theme.widths.tablet})`]: {
      width: '100%',
      paddingRight: '0px',
    },
  },
  sliderStyle: {
    position: 'relative',
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      paddingBottom: 74 - 32,
    },
  },
  product: {
    minWidth: '100%',
    marginRight: 20,
    borderRadius: '10px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      marginRight: 20,
      marginBottom: '0px',
    },
  },
  wrapper: {
    position: 'relative',
  },
  emptyBox: {
    flexShrink: 0,
    width: 10,
  },
  categories: {
    height: 'auto',
    display: 'flex',
    padding: '0 16px',
  },
  detailsMainContainer: {
    border: '1px solid #D9D9D9',
    width: '50%',
    borderRadius: '5px',
    height: '604px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      width: '100%',
      height: 'auto',
    },
  },
  sliderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 34,
    padding: '0 16px',
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      justifyContent: 'center',
    },
  },
  headerContainer: {
    width: '100%',
    borderBottom: '1px solid #D9D9D9',
    padding: '20px'
  },
  specsContainer: {
    width: '100%',
    display: 'flex',
    borderBottom: '1px solid #D9D9D9',
    padding: '20px'
  },
  priceContainer: {
    width: '65%',
    display: 'flex',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'inline'
    },
  },
  originContainer: {
    width: '35%'
  },
  offerContainer: {
    width: '100%',
    borderBottom: '1px solid #D9D9D9',
    padding: '20px'
  },
  kgBoxes: {
    width: '100%',
    display: 'flex'
  },
  gradeBox: {
    width: '50%'
  },
  catBox: {
    width: '50%'
  },
  flagHolder: {
    background: '#E9EBF0',
    padding: '10px',
    width: '45px'
  },
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
    fontSize: 32,
    fontWeight:600,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#828282',
    fontWeight:400,
    fontFamily: theme.fonts.primary,
  },
  price: {
    fontSize: 30,
  },
  unitPhrase: {
    fontSize: 12,
    paddingTop: '44px',
    paddingLeft: '5px',
    color: '#828282'
  },
  gradeDetailContainer: {
    textAlign: 'center',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    background: '#E9EBF0',
    borderRadius: '5px',
    width: '96%'
  },
  catDetailContainer: {
    textAlign: 'center',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    background: '#E9EBF0',
    borderRadius: '5px',
    width: '100%'
  },
  harvestingContainer: {
    width: '100%'
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
