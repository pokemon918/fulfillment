import { useUser } from '../hooks'
import { AddIcon } from '../icons'
import { theme } from '../theme'
import { BaseCategory, BaseProduct } from '../types'
import { Button, Container, PageBgColor } from '../ui'
import { makeStyles } from '../utils'
import { Category } from './Category'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ProductVertical } from './ProductVertical'

interface CategoryPageProps {
  categorys: BaseCategory[]
}

export function CategoryPage(props: CategoryPageProps) {
  const { categorys } = props

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
              Categories
              </h3>

              {/* {user?.role === 'admin' && (
                <Button
                  style={{ padding: '8px 12px' }}
                  href="/products/create"
                  startIcon={<AddIcon />}
                >
                  Create Product
                </Button>
              )} */}
            </div>

            <div css={styles.products}>
            {categorys?.map((category,index) => (
              <>
 <Category
              key={category._id}
              category={category}
            />
              {/* {index % 3 === 2 && <div css={{gridColumn:'1/6',height:'1px',background:'#B1E080',[`@media (max-width: ${theme.widths.tabletSm})`]: {
      display:'none'
    },}}></div>} */}
              </>
           
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

const useStyles = makeStyles((props: CategoryPageProps) => ({
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
    fontSize: '48px',
    fontWeight: '600',
    color: '#3BA83B',
    marginBottom: '30px',
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
      fontSize:'32px'
    },
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
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '50px',
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
