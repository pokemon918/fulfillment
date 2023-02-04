import ArticleView from '@/components/articles/ArticleView'
import PageLayout from '@/components/PageLayout'
import { DetailedArticle } from '@/types/article'
import Container from '@/ui/Container'
import graphqlReq from '@/utils/graphqlReq'
import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

const PageArticleView: FC<Props> = (props) => {
  const styles = useStyles(props)

  const { article } = props

  return (
    <PageLayout>
      <Container maxWidth="md">
        <ArticleView article={article} />
      </Container>
    </PageLayout>
  )
}

export default PageArticleView

interface Props {
  article: DetailedArticle
}

// styles
const useStyles = makeStyles(() => ({}))

// ssr
const GET_ARTICLE = gql`
  query ($articleId: String!) {
    article(_id: $articleId) {
      _id
      thumbnail
      title {
        en
      }
      description {
        en
      }
      content {
        en
      }
      updatedAt
    }
  }
`

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { article } = await graphqlReq(GET_ARTICLE, {
    articleId: ctx.query.articleId,
  })

  return {
    props: {
      article: {
        ...article,
        title: article.title.en,
        description: article.description.en,
        content: article.content.en,
      },
    },
  }
}
