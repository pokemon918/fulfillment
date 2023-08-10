import { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'
import { BaseProduct } from '../types'
import { Container, ScrollView } from '../ui'
import { makeStyles } from '../utils'
import { Product } from './Product'
import connectedDots from '../assets/images/connected-dots.png'

interface ProductsOverviewProps extends HTMLAttributes<HTMLDivElement> {
  products: BaseProduct[]
}

export const ProductsOverview: FC<ProductsOverviewProps> = (props) => {
  const styles = useStyles(props)

  const { products, ...divProps } = props

  return (
    <ScrollView
      maxWidth="md"
      endBlur="linear-gradient(269.92deg, #e7f4ca 0.05%, rgba(231, 244, 202, 0) 99.9%)"
      children={
        <div css={styles.categories}>
          {products.map((product) => (
            <Product key={product._id} product={product} css={styles.product} />
          ))}

          <div css={styles.emptyBox} />
        </div>
      }
      render={({ deskArrows, mobileArrows, scrollView }) => (
        <div css={styles.wrapper} {...divProps}>
          <div css={styles.root}>
            <Container maxWidth="md">
              <div css={styles.header}>
                <div css={styles.subheader}>
                  <h4 css={styles.heading}>DEAL <span css={styles.subHeading}>OPPORTUNITIES</span></h4>
                </div>

                {deskArrows}
              </div>

              <p css={styles.desc}>
                Explore the best offers currently on the marketplace.
              </p>
            </Container>

            {scrollView}

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
    header: {
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
    subheader: {
      display: 'flex',
      gap: '12px 16px',
      justifyContent: 'center',
    },
    deskArrows: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 32,
    },
    heading: {
      fontWeight: 300,
      fontSize: 48,
      lineHeight: 1.25,
      textAlign: 'center',
      color: '#3BA83B',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        fontSize: 40,
      },
    },
    subHeading: {
      fontWeight: 600,
      fontSize: 48,
      lineHeight: 1.25,
      textAlign: 'center',
      color: '#3BA83B',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        fontSize: 36,
      },
    },
    categories: {
      height: 'auto',
      display: 'flex',
      padding: '0 16px',
    },
    category: {
      marginRight: 36,
      ...box,
    },
    emptyBox: {
      flexShrink: 0,
      width: 10,
    },
    desc: {
      fontSize: 24,
      fontWeight: 500,
      marginBottom: 40,
      marginLeft: 20,
      width: '700px',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        width: 'auto',
        marginLeft: 0,
        fontSize: 16,
        textAlign: 'center'
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