import { countries } from '../data'
import { useUser } from '../hooks'
import { ArrowLeft, ArrowRight, BackIcon, HomeIcon } from '../icons'
import { theme } from '../theme'
import { DetailedInvestment, DetailedProduct } from '../types'
import {
  Button,
  Progress,
  CountryLabel,
  ScrollView,
  Container,
  IconButton,
} from '../ui'
import { makeStyles } from '../utils'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC, HTMLAttributes, useCallback, useMemo, useRef, useState } from 'react'
import { ExcerptGallery } from './ExcerptGallery'
import { MonthsRange } from './MonthsRange'
import kgImg from '../assets/images/kg.png'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'



interface ProductItem extends DetailedProduct {
  type: 'product'
}

interface InvestmentItem extends DetailedInvestment {
  type: 'investment'
}

interface ItemIntroProps extends HTMLAttributes<HTMLDivElement> {
  gallery: string[]
  item: ProductItem | InvestmentItem
  onClickGetQuote: () => void,
  buttonRef: React.RefObject<Element> | any;
  onShowSmartContract: () => void
}

export const ItemIntro: FC<ItemIntroProps> = (props) => {
  const user = useUser()
  const styles = useStyles(props)

  const { gallery, item, onClickGetQuote, buttonRef, onShowSmartContract, ...divProps} = props

  const countryName = useMemo(
    () => countries.find((c) => c.code === item.country)?.name,
    [item.country]
  )
  const countryCode = useMemo(
    () => countries.find((c) => c.code === item.country)?.code,
    [item.country]
  )

  const sliderRef = useRef<any>(null)

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
  }, [])

  const [paginationIndex, setPaginationIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setPaginationIndex(swiper.realIndex);
  };

  return (
    <div {...divProps}>
      <div css={styles.header}>
        <Link css={styles.back} href="/">
          <BackIcon style={{ marginRight: 0, color: '#90AF47' }} />
          <span>Back to homepage</span>
        </Link>

        {user?.role === 'admin' ? (
          <Button
            variant="outlined"
            fullRounded
            href={`/${item.type}s/${item._id}/update`}
          >
            Update
          </Button>
        ) : (
          <Link css={styles.back2} href="/">
            <HomeIcon style={{ marginRight: 6 }} />
            <span>{'Home >'}</span>&nbsp;
            <span
              style={{ color: '#90AF47' }}
            >{`${countryName}-${item.name}`}</span>
          </Link>
        )}
      </div>

      <div css={styles.megaContainer}>
        <div css={styles.scrollContainer}>
          {/* <ScrollView
            maxWidth="md"
            endBlur=""
            children={
              <div css={styles.categories}>
                {gallery.map((productImage, index) => (
                  <div key={index} css={styles.product}><img src={productImage} style={{ borderRadius: '10px',
                  width: '100%',
                  objectFit: 'cover',
                  aspectRatio: '4/5'}} /></div>
                ))}

                <div css={styles.emptyBox} />
              </div>
            }
            render={({ deskArrows, mobileArrows, scrollView }) => (
              <div css={styles.wrapper} {...divProps}>
                <div css={styles.sliderStyle}>
                  {scrollView}

                  <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    {deskArrows}
                  </div>

                  {mobileArrows}
                </div>
              </div>
            )}
          /> */}

          <Swiper
            ref={sliderRef}
            className="mySwiper"
            onSlideChange={handleSlideChange}
          >
            {gallery.map((productImage, index) => (
              <SwiperSlide key={index}>
                <img
                  src={productImage}
                  css={styles.sliderImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div style={{ display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
margin: '10px 0 45px 0'}}>
            <p>{paginationIndex + 1}/{gallery.length}</p>
            <div css={styles.deskArrows}>
              <IconButton
                bordered
                style={{ marginRight: 16 }}
                children={<ArrowLeft />}
                onClick={handlePrev}
              />
              <IconButton
                bordered
                children={<ArrowRight />}
                onClick={handleNext}
              />
            </div>
          
          </div>

          {item.traces.map((item, key) => {
            return (
              <div>
                <div style={{ position: 'relative' }}>
                  <img
                    src={item.gallery[0]}
                    style={{
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      aspectRatio: '2/1'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-18px',
                      left: (key + 1) % 2 !== 0 ? '32px' : 'unset',
                      right: (key + 1) % 2 == 0 ? '32px' : 'unset',
                      background: '#B1DA50',
                      border: '6px solid #fff',
                      borderRadius: '50%',
                      width: '100px',
                      height: '100px',
                      color: '#fff',
                      fontSize: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {key + 1}
                  </div>
                </div>
                <h2
                  style={{
                    margin: '40px 0px 10px 0',
                    fontSize: '28px',
                    fontWeight: '500',
                  }}
                >
                  {item.title}
                </h2>
                <p
                  css={styles.subtitle}
                  style={{
                    marginBottom: '40px',
                    color: '#818181',
                    lineHeight: '1.5',
                  }}
                >
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

        <div css={styles.detailsMainContainer}>
          <div css={styles.headerContainer} ref={buttonRef}>
            <p css={styles.subtitle}>HS Code: {item.hsCode}</p>
            <h2 css={styles.title}>
              {countryName} - {item.name}
            </h2>
            <p css={styles.subtitle}>
              Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum
              Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum
            </p>
          </div>

          <div css={styles.specsContainer}>
            <div css={styles.priceContainer} >
              {item.type === 'product' ? (
                <div>
                  <p
                    style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      marginBottom: '10px',
                    }}
                  >
                    Price
                  </p>
                  <h3 style={{ marginTop: 0 }} css={styles.price}>
                    ${item.price} ~
                  </h3>
                </div>
              ) : (
                <div style={{ marginTop: 26 }}>
                  <Progress
                    css={styles.progress}
                    value={Math.round(
                      (item.paidAmount / item.goalAmount) * 100
                    )}
                  />

                  <p css={styles.remainPrice}>$ {item.paidAmount}</p>

                  <p css={styles.goalPrice}>
                    pledged of ${item.goalAmount} goal
                  </p>
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
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                Origin: {countryName}
              </p>
              <div css={styles.flagHolder}>
                <CountryLabel countryCode={countryCode} noName />
              </div>
            </div>
          </div>

          <div css={styles.offerContainer}>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '16px',
                marginBottom: '10px',
              }}
            >
              Current Offer Base Prices
            </p>

            <div css={styles.kgBoxes} >
              <div css={styles.gradeBox}>
                <p css={styles.subtitle}>Grade: No.1</p>
                <div css={styles.gradeDetailContainer}>
                  <img src={kgImg.src} style={{ marginRight: '5px' }} />
                  <p
                    style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      paddingTop: '5px',
                    }}
                  >
                    $6/kg
                  </p>
                </div>
              </div>
              <div css={styles.catBox} >
                <p css={styles.subtitle}>Cat1 - 2kg box</p>
                <div css={styles.catDetailContainer}>
                  <img src={kgImg.src} style={{ marginRight: '5px' }} />
                  <p
                    style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      paddingTop: '5px',
                    }}
                  >
                    $6/kg
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div css={styles.harvestingContainer}>
            <div style={{ padding: '20px' }}>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginBottom: '10px',
                }}
              >
                Harvesting Seasonality
              </p>

              <MonthsRange
                style={{ marginBottom: 36 }}
                picked={item.harvestingMonths}
              />
            </div>


<Button
           
              fullWidth
              style={{
                fontWeight: 'bold',
                paddingTop: 20,
                paddingBottom: 20,
                borderRadius:0,
               
              }}
              onClick={onClickGetQuote}
            >
              Get a Quote
            </Button>


<Button
           
              fullWidth
              style={{
                fontWeight: 'bold',
                paddingTop: '20px',
                paddingBottom: '20px',
                borderRadius: '0px 0px 10px 10px',
                marginTop: '15px'
              }}
              onClick={onShowSmartContract}
            >
              Create Smart Contract
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
    marginTop: '40px',
    justifyContent: 'space-between',
    gap: '30px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'grid',
      marginTop: '0px',
    },
  },
  sliderImage:{
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      height:'300px'
    },
      width: '100%',
      height: '640px',
      objectFit: 'cover',
      borderRadius: '10px',
    
  },
  deskArrows: {
   
    '& button': {
      width: '35px',
      height: '35px',
    },
  },
 
  scrollContainer: {
    flex: 1,

    overflow: 'hidden',
    /* Handle */
    // '::-webkit-scrollbar-thumb': {
    //   background: '#B1DA50'
    // },

    /* Handle on hover */
    // '::-webkit-scrollbar-thumb:hover': {
    //   background: '#B1DA50'
    // },
    [`@media (max-width: ${theme.widths.tablet})`]: {
      width: '100%',
      paddingRight: '0px',
      marginTop:'40px'
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
    border: '1px solid rgba(217, 217, 217, 0.5)',
    flex: '1',
    borderRadius: '10px',
    height: '100%',
    position: 'sticky',
    top: '80px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      width: '100%',
      height: 'auto',
      gridRow: '1/2',
position: 'relative',
top: '10px'
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
    borderBottom: '1px solid rgba(217, 217, 217, 0.5)',
    padding: '20px',
  },
  specsContainer: {
    width: '100%',
    display: 'flex',
    borderBottom: '1px solid rgba(217, 217, 217, 0.5)',
    padding: '20px',
  },
  priceContainer: {
    width: '65%',
    display: 'flex',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'inline',
    },
  },
  originContainer: {
    width: '35%',
  },
  offerContainer: {
    width: '100%',
    borderBottom: '1px solid rgba(217, 217, 217, 0.5)',
    padding: '20px',
  },
  kgBoxes: {
    width: '100%',
    display: 'flex',
  },
  gradeBox: {
    width: '100%',
  },
  catBox: {
    width: '100%',
  },
  flagHolder: {
    background: '#E9EBF0',
    padding: '10px',
    width: '45px',
    borderRadius: '5px',
    marginTop: '5px',
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
  back2: {
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      display: 'none',
    },
    color: '#000',
    textDecoration: 'none',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#818181',
    fontWeight: 400,
    fontFamily: theme.fonts.primary,
    marginBottom: '10px',
  },
  price: {
    fontSize: 30,
  },
  unitPhrase: {
    fontSize: 12,
    paddingTop: '44px',
    paddingLeft: '5px',
    color: '#818181',
  },
  gradeDetailContainer: {
    textAlign: 'center',
    padding: '25px',
    display: 'flex',
    justifyContent: 'center',
    background: '#F8F8F8',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '244px',
    maxHeight: '72px',
    border: '1px solid #E9EBF0',
  },
  catDetailContainer: {
    textAlign: 'center',
    padding: '25px',
    display: 'flex',
    justifyContent: 'center',
    background: '#F8F8F8',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '244px',
    maxHeight: '72px',
    border: '1px solid #E9EBF0',
  },
  harvestingContainer: {
    width: '100%',
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
