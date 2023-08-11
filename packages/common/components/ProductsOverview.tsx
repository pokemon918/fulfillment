import React, { ChangeEvent, FC, HTMLAttributes } from 'react'
import { theme } from '../theme'
import { BaseProduct } from '../types'
import { ScrollView } from '../ui'
import { makeStyles } from '../utils'
import { Product } from './Product'
import { SearchBox } from '../ui/SearchBox'
import connectedDots from '../assets/images/connected-dots.png'

interface ProductsOverviewProps extends HTMLAttributes<HTMLDivElement> {
  products: BaseProduct[]
}

export const ProductsOverview: FC<ProductsOverviewProps> = (props) => {
  const styles = useStyles(props)

  const { products, ...divProps } = props
  const [searchedProducts, setSearchedProducts] = React.useState<BaseProduct[]>(products);
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const searchText = e.target.value.toLowerCase().trim();
    const searchResult1 = products?.filter((product) => product?.name.toLowerCase().trim()?.startsWith(searchText));
    const searchResult2 = products?.filter((product) => product?.name.toLowerCase().trim()?.includes(searchText));
    setSearchedProducts(searchResult1?.length > 0 ? searchResult1 : searchResult2);
  }

  return (
    <ScrollView
      maxWidth="none"
      endBlur="linear-gradient(269.92deg, #e7f4ca 0.05%, rgba(231, 244, 202, 0) 99.9%)"
      children={
        <div css={styles.categories}>
          {searchedProducts?.map((product) => (
            <Product key={product._id} product={product} css={styles.product} />
          ))}
          <div css={styles.emptyBox} />
        </div>
      }
      render={({ deskArrows, mobileArrows, scrollView }) => (
        <div css={styles.wrapper} {...divProps}>
          <div css={styles.root}>
            <div css={styles.header}>
              <div css={styles.subheader}>
                <h4 css={styles.heading}>DEAL <span css={styles.subHeading}>OPPORTUNITIES</span></h4>
              </div>
            </div>
            <div css={styles.descArrows}>
              <p css={styles.desc}>
                Explore the best offers currently on the marketplace.
              </p>
              <div css={styles.deskArrows}>
                {deskArrows}
              </div>
            </div>
            <div css={styles.searchBarWrapper}>
              <SearchBox type="text" placeholder="Search Products..." value={inputValue} onChange={handleChange} />
            </div>
            <div css={styles.scrollView}>
              {scrollView}
            </div>
            {mobileArrows}
          </div>
        </div>
      )}
    />
  )
}

const useStyles = makeStyles((props: ProductsOverviewProps) => {
  const box = {
    width: 265,
    flexShrink: 0,
    '@media (max-width: 360px)': {
      width: 'calc(100% - 64px)',
    },
  }

  return {
    wrapper: {
      position: 'relative',
    },
    root: {
      position: 'relative',
      paddingTop: 74,
      paddingBottom: 74,
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        paddingBottom: 74 - 32,
      },
    },
    searchBarWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '40px 0 30px 96px',
      background: "#fff",
      [`@media (max-width: ${theme.widths.tablet})`]: {
        justifyContent: 'center',
        padding: '60px 0 20px 0px',
      },
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        padding: '40px 0 20px 0px',
      },
    },
    scrollView: {
      margin: 0,
      padding: '0 0 0 96px',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        padding: '0 16px',
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '0 0 0 96px',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        justifyContent: 'center',
        padding: '0 16px',
      },
    },
    subheader: {
      display: 'flex',
      gap: '12px 16px',
      justifyContent: 'center',
    },
    heading: {
      fontWeight: 300,
      fontSize: 48,
      lineHeight: 1.25,
      textAlign: 'center',
      color: '#3BA83B',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        fontSize: 38,
      },
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        fontSize: 32,
      },
    },
    subHeading: {
      fontWeight: 600,
      fontSize: 48,
      lineHeight: 1.25,
      textAlign: 'center',
      color: '#3BA83B',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        fontSize: 38,
      },
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        fontSize: 32,
      },
    },
    categories: {
      height: 'auto',
      display: 'flex',
      padding: 0,
    },
    category: {
      marginRight: 36,
      ...box,
    },
    emptyBox: {
      flexShrink: 0,
      width: 10,
    },
    descArrows: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 0 0 96px',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        justifyContent: 'center',
        padding: '0 16px',
      },
    },
    desc: {
      fontSize: 24,
      fontWeight: 500,
      width: '700px',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        width: 'auto',
        marginLeft: 0,
        fontSize: 16,
        textAlign: 'center'
      },
    },
    deskArrows: {
      display: 'flex',
      justifyContent: 'center',
      paddingRight: 16,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        display: 'none',
      },
    },
    product: {
      minWidth: 370,
      marginRight: 20,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        marginRight: 20,
        minWidth: '100%',
      },
    }
  }
})