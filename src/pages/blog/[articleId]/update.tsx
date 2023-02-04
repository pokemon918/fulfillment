import ArticleForm, {
  ArticleFormValue,
} from '@/components/articles/ArticleForm'
import PageLayout from '@/components/PageLayout'
import Container from '@/ui/Container'
import graphqlReq from '@/utils/graphqlReq'
import makeStyles from '@/utils/makeStyles'
import { gql } from 'graphql-request'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

const GET_ARTICLE = gql`
  query ($_id: String!) {
    article(_id: $_id) {
      _id
      title {
        en
        es
      }
      description {
        en
        es
      }
      content {
        en
        es
      }
      thumbnail
      keywordsIds
    }
  }
`

const PageArticleUpdate: FC<Props> = (props) => {
  const styles = useStyles(props)

  const router = useRouter()

  const articleId = router.query.articleId as string

  const [article, setArticle] = useState<ArticleFormValue | null>(null)

  useEffect(() => {
    ;(async () => {
      const data = await graphqlReq(GET_ARTICLE, {
        _id: articleId,
      })

      setArticle(data.article)
    })()
  }, [])

  if (!article) return null

  return (
    <PageLayout>
      <Container maxWidth="md">
        <ArticleForm defaultValues={article} actionType="update" />
      </Container>
    </PageLayout>
  )
}

export default PageArticleUpdate

interface Props {}

// styles
const useStyles = makeStyles(() => ({}))

// ssr
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  return {
    props: {},
  }
}
