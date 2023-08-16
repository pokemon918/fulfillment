import { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'
import { BaseInvestment } from '../types'
import { Container, ScrollView } from '../ui'
import { makeStyles } from '../utils'
import { Investment } from './Investment'
import { ProductVertical } from './ProductVertical'

interface RelatedInvestmentsProps extends HTMLAttributes<HTMLDivElement> {
  investments: BaseInvestment[]
}

export const RelatedInvestments: FC<RelatedInvestmentsProps> = (props) => {
  const styles = useStyles(props)

  const { investments, ...divProps } = props

  if (investments.length === 0) return null

  return (
    <ScrollView
      maxWidth="md"
      endBlur="linear-gradient(269.92deg, #f8f8f8 0.05%, rgb(248 248 248 / 0%) 99.9%)"
      children={
        <div css={styles.products}>
          {investments.map((investment) => (
            <Investment
              css={styles.product}
              key={investment._id}
              investment={investment}
              href={`/investments/${investment._id}`}
              squareImg
            />
          ))}

          <div css={styles.emptyProduct} />
        </div>
      }
      render={({ deskArrows, mobileArrows, scrollView }) => (
        <div {...divProps}>
          <Container maxWidth="md">
            <div css={styles.header}>
              <h2 css={styles.title}>Other Related Products</h2>

              {deskArrows}
            </div>
          </Container>

          {scrollView}

          {mobileArrows}
        </div>
      )}
    />
  )
}

const useStyles = makeStyles(({}: RelatedInvestmentsProps) => ({
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 56,
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  title: {
    fontSize: 30,
  },
  products: {
    height: 'auto',
    display: 'flex',
    padding: '0 16px',
    fontFamily: theme.fonts.secondary,
  },
  product: {
    flexShrink: 0,
    width: 258,
    marginRight: 18,
    [`@media (max-width: ${theme.widths.mobileSm})`]: {
      width: 'calc(100% - 32px)',
    },
  },
  emptyProduct: {
    width: 28,
    flexShrink: 0,
  },
}))

