import Article from '@/components/Article'
import PageLayout from '@/components/PageLayout'
import { useUser } from '@/hooks/useUser'
import AddIcon from '@/icons/AddIcon'
import theme from '@/theme'
import { BaseArticle } from '@/types/article'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import graphqlReq from '@/utils/graphqlReq'
import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

const PageBlog: FC<Props> = (props) => {
  const styles = useStyles(props)

  const user = useUser()

  const { articles } = props

  return (
    <PageLayout>
      <Container maxWidth="md">
        <div css={styles.header}>
          <h3 css={styles.heading}>Articles</h3>

          {user?.role === 'admin' && (
            <Button
              style={{ padding: '8px 12px' }}
              href="/blog/create"
              startIcon={<AddIcon />}
            >
              Create Article
            </Button>
          )}
        </div>

        <div css={styles.articles}>
          {articles.map((article) => (
            <Article key={article._id} article={article} />
          ))}
        </div>
      </Container>
    </PageLayout>
  )
}

export default PageBlog

interface Props {
  articles: BaseArticle[]
}

// styles
const useStyles = makeStyles(() => ({
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
  articles: {
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

// ssr
const GET_ARTICLES = gql`
  {
    articles (descCreatedAt: true) {
      _id
      title {
        en
      }
      description {
        en
      }
      thumbnail
    }
  }
`
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { articles } = await graphqlReq(GET_ARTICLES)

  return {
    props: {
      articles: articles.map((article: any) => ({
        ...article,
        title: article.title.en,
        description: article.description.en,
      })),
    },
  }
}
