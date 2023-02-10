import { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import { DetailedArticle } from '../types'
import { Container } from '../ui'
import { graphqlReq, makeStyles } from '../utils'
import { ArticleView } from './articles'
import { PageLayout } from './PageLayout'

export const ArticleViewPage: FC<Props> = (props) => {
  const { article } = props

  return (
    <PageLayout>
      <Container maxWidth="md">
        <ArticleView article={article} />
      </Container>
    </PageLayout>
  )
}

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

export const getArticleViewStaticProps: GetStaticProps<Props> = async (ctx) => {
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

export const getArticleViewStaticPaths: GetStaticPaths = async () => {
  const { articles } = await graphqlReq(GET_ARTICLES)

  const paths = articles.map((article: any) => ({
    params: { articleId: article._id },
  }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}
