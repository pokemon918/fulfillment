import { useUser } from '../hooks'
import { AddIcon } from '../icons'
import { theme } from '../theme'
import { BaseCategory, BaseProduct } from '../types'
import { Button, Container, PageBgColor } from '../ui'
import { makeStyles } from '../utils'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ProductVertical } from './ProductVertical'

interface ProductsPageProps {
  category?: BaseCategory
  products: BaseProduct[]
}

export function ProductsPage(props: ProductsPageProps) {
  const { products, category } = props

  const user = useUser()

  const styles = useStyles(props)

  return (
    <>
      <PageBgColor bgColor="#f8f8f8" />

      <div css={styles.root}>
        <Navbar css={styles.navbar} />

        <div css={styles.body}>
          <div style={{ height: 48 }} />

          <Container maxWidth="md">
            <div css={styles.header}>
              <h3 css={styles.heading}>
                Products {category ? ` / ${category.name}` : null}
              </h3>

              {user?.role === 'admin' && (
                <Button
                  style={{ padding: '8px 12px' }}
                  href="/products/create"
                  startIcon={<AddIcon />}
                >
                  Create Product
                </Button>
              )}
            </div>

            <div css={styles.products}>
              {products.map((product) => (
                <ProductVertical key={product._id} product={product} />
              ))}
            </div>
          </Container>

          <div style={{ height: 96 }} />
        </div>

        <Footer css={styles.footer} />
      </div>
    </>
  )
}

const useStyles = makeStyles((props: ProductsPageProps) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  heading: {
    fontSize: 25,
    fontWeight: 700,
  },
  navbar: {
    flexShrink: 1,
  },
  body: {
    flexGrow: 1,
  },
  footer: {
    flexShrink: 1,
  },
  products: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '48px 24px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [`@media (max-width: ${theme.widths.mobile})`]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
}))
