import { useForm } from 'react-hook-form'
import Input from '@/ui/Input'
import { gql } from 'graphql-request'
import { FC, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { LangField } from '@/types/lang-field'
import graphqlReq from '@/utils/graphqlReq'
import ThumbnailInput from '@/components/ThumbnailInput'
import makeStyles from '@/utils/makeStyles'
import Button from '@/ui/Button'
import StyledLink from '@/ui/StyledLink'
import Editor from '../tinymce/Editor'

const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: CreateArticleInput!, $filenames: [String!]!) {
    article: createArticle(input: $input) {
      _id
    }
    deleteFiles(filenames: $filenames)
  }
`

const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($input: UpdateArticleInput!, $filenames: [String!]!) {
    article: updateArticle(input: $input) {
      _id
    }
    deleteFiles(filenames: $filenames)
  }
`

const DELETE_ARTICLE = gql`
  mutation ($_id: String!) {
    deleteArticle(_id: $_id)
  }
`

const DELETE_FILES = gql`
  mutation ($filenames: [String!]!) {
    deleteFiles(filenames: $filenames)
  }
`

export interface ArticleFormValue {
  _id?: string
  title: LangField
  description: LangField
  content: LangField
  thumbnail: string
  keywordsIds: string[]
}

interface ArticleFormProps {
  defaultValues: ArticleFormValue
  actionType: 'create' | 'update'
}

const ArticleForm: FC<ArticleFormProps> = ({ defaultValues, actionType }) => {
  const styles = useStyles({})

  const [isSuccess, setIsSuccess] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  const savedFilenames = useRef(
    [defaultValues?.thumbnail]
      .filter((fn) => typeof fn === 'string')
      .map((fn) => fn.split('/').slice(-1)[0])
  )

  const deletedFilenames = useRef<string[]>([])

  const { control, handleSubmit, getValues } = useForm({ defaultValues })

  const onSubmit = handleSubmit((article) => {
    setIsSuccess(false)
    setSaving(true)

    graphqlReq(actionType === 'update' ? UPDATE_ARTICLE : CREATE_ARTICLE, {
      input: article,
      filenames: deletedFilenames.current,
    })
      .then(() => {
        if (actionType === 'create') {
          router.push(`/blog`)
        } else {
          setIsSuccess(true)
        }
      })
      .catch(() => {
        alert('an error occur please try again')
      })
      .finally(() => {
        setSaving(false)
      })
  })

  const onDelete = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this product'
    )

    if (isConfirmed) {
      const { _id } = defaultValues

      setDeleting(true)

      graphqlReq(DELETE_ARTICLE, { _id })
        .then(() => {
          router.push(`/blog`)
        })
        .catch(() => {
          alert('Please check your internet connection')
        })
        .finally(() => {
          setDeleting(false)
        })
    }
  }

  const onAssetDelete = (filename: string) => {
    if (savedFilenames.current.includes(filename)) {
      deletedFilenames.current.push(filename)
    } else {
      graphqlReq(DELETE_FILES, { filenames: [filename] })
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 25, marginBottom: '2rem' }}>
        {actionType === 'create' ? 'Create' : 'Update'} Article
      </h1>

      <form onSubmit={onSubmit}>
        <Input
          style={{ marginBottom: 32 }}
          label="Title"
          placeholder="Title"
          control={control}
          name="title.en"
          required
        />

        <p style={{ fontSize: 14, marginBottom: 8 }}>Thumbnail</p>

        <ThumbnailInput
          fullWidth
          style={{ marginBottom: 32 }}
          name="thumbnail"
          control={control}
          onDelete={onAssetDelete}
        />

        <Input
          style={{ marginBottom: 32 }}
          label="Description"
          placeholder="Description"
          control={control}
          name="description.en"
          required
          multiline
          rows={3}
        />

        <Editor
          style={{ marginBottom: 32 }}
          label="Content"
          placeholder="Content"
          control={control}
          name="content.en"
        />

        <div css={styles.footer}>
          <Button type="submit" disabled={saving}>
            Save
          </Button>

          {actionType === 'update' && (
            <Button
              type="button"
              style={{ background: '#f44336', color: '#fff' }}
              disabled={deleting}
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
        </div>

        <p
          style={{
            color: '#1b5e20',
            marginTop: 16,
            visibility: isSuccess ? 'visible' : 'hidden',
          }}
        >
          Updated Successfully!{' '}
          <StyledLink href={`/blog/${defaultValues._id}`}>View it</StyledLink>
        </p>
      </form>

      <div style={{ padding: 100 }} />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 20,
    fontWeight: 700,
  },
  trace: {
    border: '1px solid #eee',
    borderRadius: 8,
  },
  footer: {
    justifyContent: 'space-between',
    display: 'flex',
    marginTop: '2rem',
  },
}))

export default ArticleForm
