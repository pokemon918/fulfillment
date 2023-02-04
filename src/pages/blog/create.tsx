import ArticleForm, { ArticleFormValue } from '@/components/articles/ArticleForm'
import PageLayout from '@/components/PageLayout'
import Container from '@/ui/Container'
import makeStyles from '@/utils/makeStyles'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

const PageArticleCreate: FC<Props> = (props) => {
  const styles = useStyles(props)

  const defaultValues: ArticleFormValue = {
    title: { en: '', es: '' },
    description: { en: '', es: '' },
    content: { en: '', es: '' },
    thumbnail: '',
    keywordsIds: []
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

interface Props {}

// styles
const useStyles = makeStyles(() => ({}))

// ssr
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  return {
    props: {},
  }
}
