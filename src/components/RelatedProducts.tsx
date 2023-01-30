import ArrowLeft from '@/icons/ArrowLeft'
import ArrowRight from '@/icons/ArrowRight'
import theme from '@/theme'
import { BaseProduct } from '@/types/product'
import Container from '@/ui/Container'
import ContainerWide from '@/ui/ContainerWide'
import IconButton from '@/ui/IconButton'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, useRef } from 'react'
import ProductVertical from './PorductVertical'

interface RelatedProductsProps extends HTMLAttributes<HTMLDivElement> {
  products: BaseProduct[]
}

const RelatedProducts: FC<RelatedProductsProps> = (props) => {
  const styles = useStyles(props)

  const { products, ...divProps } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const getNextViewWidth = (container: HTMLDivElement) => {
    const containerWidth = container.clientWidth
    const fractionalWidth = containerWidth % 276
    return containerWidth - fractionalWidth
  }

  const next = () => {
    const container = containerRef.current!

    container.scroll({
      top: 0,
      left: container.scrollLeft + 276,
      behavior: 'smooth',
    })
  }

  const prev = () => {
    const container = containerRef.current!

    container.scroll({
      top: 0,
      left: container.scrollLeft - 276,
      behavior: 'smooth',
    })
  }

  return (
    <div {...divProps}>
      <Container maxWidth="md">
        <div css={styles.header}>
          <h2 css={styles.title}>Other Related Products</h2>

          <div css={styles.deskArrows}>
            <IconButton
              bordered
              style={{ marginRight: 16 }}
              children={<ArrowLeft />}
              onClick={prev}
            />
            <IconButton bordered children={<ArrowRight />} onClick={next} />
          </div>
        </div>
      </Container>

      <ContainerWide
        ref={containerRef}
        scrollable
        endBlur="linear-gradient(269.92deg, #f8f8f8 0.05%, rgb(248 248 248 / 0%) 99.9%)"
        contentEndWidth={258 + 16}
      >
        <div css={styles.products}>
          {[
            ...products,
            ...products,
            ...products,
            ...products,
            ...products,
          ].map((product, idx) => (
            <ProductVertical key={idx} product={product} />
          ))}

          <div />
        </div>
      </ContainerWide>

      <div css={styles.tabletSmArrows}>
        <IconButton
          bordered
          style={{ marginRight: 16 }}
          children={<ArrowLeft />}
          onClick={prev}
        />
        <IconButton bordered children={<ArrowRight />} onClick={next} />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: RelatedProductsProps) => ({
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
  deskArrows: {
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      display: 'none',
    },
  },
  tabletSmArrows: {
    display: 'none',
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 32,
    },
  },
  products: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 258,
    padding: '0 16px',
    gap: 18,
    '@media (max-width: 320px)': {
      gridAutoColumns: 'calc(100% - 32px)',
    },
  },
}))

export default RelatedProducts
