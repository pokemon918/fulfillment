import ArrowLeft from '@/icons/ArrowLeft'
import ArrowRight from '@/icons/ArrowRight'
import { BaseProduct } from '@/types/product'
import Container from '@/ui/Container'
import ContainerWide from '@/ui/ContainerWide'
import IconButton from '@/ui/IconButton'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, useRef } from 'react'
import Product from './Product'

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

          <div>
            <IconButton
              style={{ marginRight: 16 }}
              children={<ArrowLeft />}
              onClick={prev}
            />
            <IconButton children={<ArrowRight />} onClick={next} />
          </div>
        </div>
      </Container>

      <ContainerWide
        ref={containerRef}
        scrollable
        endBlur
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
            <Product key={idx} product={product} imgHeight={258} />
          ))}

          <div />
        </div>
      </ContainerWide>
    </div>
  )
}

const useStyles = makeStyles(({}: RelatedProductsProps) => ({
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 56,
  },
  title: {
    fontSize: 30,
  },
  products: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 258,
    gap: 18,
  },
}))

export default RelatedProducts
