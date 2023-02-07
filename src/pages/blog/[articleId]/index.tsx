import ArticleView from '@/components/articles/ArticleView'
import PageLayout from '@/components/PageLayout'
import { DetailedArticle } from '@/types/article'
import Container from '@/ui/Container'
import graphqlReq, { graphqlServerReq } from '@/utils/graphqlReq'
import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
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
      keywords {
        _id
        name {
          en
        }
      }
      updatedAt
    }
  }
`

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const articleId = ctx.params?.articleId as string

  const { article } = await graphqlReq(GET_ARTICLE, { articleId })

  return {
    props: {
      article: {
        ...article,
        title: article.title.en,
        description: article.description.en,
        content: article.content.en,
        keywords: article.keywords.map((keyword: any) => ({
          ...keyword,
          name: keyword.name.en,
        })),
      },
    },
  }
}

const GET_ARTICLES = gql`
  query {
    articles {
      _id
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const { articles } = await graphqlReq(GET_ARTICLES)

  const paths = articles.map((article: any) => ({
    params: { articleId: article._id },
  }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}
