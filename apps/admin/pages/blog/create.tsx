import { ArticleForm, ArticleFormValue, Container, PageLayout } from 'common'
import { FC } from 'react'

const PageArticleCreate: FC = () => {

  const defaultValues: ArticleFormValue = {
    title: { en: '', es: '' },
    description: { en: '', es: '' },
    content: { en: '', es: '' },
    thumbnail: '',
    keywordsIds: [],
  }

  return (
    <PageLayout>
      <Container maxWidth="md">
        <ArticleForm defaultValues={defaultValues} actionType="create" />
      </Container>
    </PageLayout>
  )
}

export default PageArticleCreate
