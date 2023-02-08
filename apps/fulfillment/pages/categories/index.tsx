import {
  AddIcon,
  BaseCategory,
  Button,
  Container,
  makeStyles,
  PageLayout,
  theme,
  useGql,
  useUser,
  withAuth,
} from 'common'
import { gql } from 'graphql-request'
import Link from 'next/link'
import { useMemo } from 'react'

function PageCategories(props: PageCategoriesProps) {
  const user = useUser()

  const styles = useStyles(props)

  const { data } = useGql<{
    categories: BaseCategory[]
  }>(GET_CATEGORIES)

  const categories = useMemo(
    () =>
      data?.categories.map((category: any) => ({
        ...category,
        name: category.name.en,
      })) ?? [],
    [data?.categories]
  )

  const loading = !data

  return (
    <PageLayout bgColor="#f8f8f8">
      <Container maxWidth="md">
        <div css={styles.header}>
          <h3 css={styles.heading}>Categories</h3>

          {user?.role === 'admin' && (
            <Button
              style={{ padding: '8px 12px' }}
              href="/categories/create"
              startIcon={<AddIcon />}
            >
              Create Category
            </Button>
          )}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : (
          <div css={styles.categories}>
            {categories.map((category) => (
              <Link
                key={category._id}
                css={styles.category}
                href={`/categories/${category._id}/update`}
              >
                <div
                  css={styles.categoryImg}
                  style={{ backgroundImage: `url(${category.thumbnail})` }}
                />

                <div css={styles.categoryDetails}>
                  <h3 css={styles.categoryName}>{category.name}</h3>
                  <Button style={{ minWidth: 146 }}>Update</Button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </PageLayout>
  )
}

export default withAuth(PageCategories, 'admin')

interface PageCategoriesProps {}

const useStyles = makeStyles((props: PageCategoriesProps) => ({
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
  categories: {
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
  category: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 20,
    border: '1px solid #CFCFCF',
    alignItems: 'flex-start',
    textDecoration: 'none',
    color: 'inherit',
  },
  categoryDetails: {
    padding: 16,
  },
  categoryImg: {
    width: '100%',
    height: 315,
    objectFit: 'cover',
    borderRadius: 20,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 16,
  },
}))

const GET_CATEGORIES = gql`
  query {
    categories {
      _id
      name {
        en
      }
      thumbnail
    }
  }
`
