import {
  ArticleForm,
  ArticleFormValue,
  Container,
  graphqlReq,
  makeStyles,
  PageLayout,
} from 'common'
import { gql } from 'graphql-request'
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
    if (!router.isReady) return
    ;(async () => {
      const data = await graphqlReq(GET_ARTICLE, {
        _id: articleId,
      })

      setArticle(data.article)
    })()
  }, [router.isReady])

  return (
    <PageLayout>
      <Container maxWidth="md">
        {article ? (
          <ArticleForm defaultValues={article} actionType="update" />
        ) : (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        )}
      </Container>
    </PageLayout>
  )
}

export default PageArticleUpdate

interface Props {}

// styles
const useStyles = makeStyles(() => ({}))
