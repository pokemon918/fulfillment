import { useForm } from 'react-hook-form'
import { gql } from 'graphql-request'
import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { LangField, BaseKeyword } from '../../types'
import { graphqlReq, makeStyles, revalidateArticle } from '../../utils'
import { ThumbnailInput } from '../ThumbnailInput'
import { Button, Input, StyledLink } from '../../ui'
import { Editor } from '../tinymce'
import { KeywordsSelect } from '../KeywordsSelect'
import { RevalidateIndictor } from '../RevalidateIndictor'
import { ItemDeleteButton } from '../ItemDeleteButton'
import { toast } from 'react-toastify'
import { useUser } from "../../hooks";

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

const GET_KEYWORDS = gql`
  {
    keywords {
      _id
      name {
        en
      }
    }
  }
`

const CREATE_LOG = gql`
  mutation createLog($input: CreateLogInput!) {
    createLog(input: $input)  {
      _id
    }
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

export const ArticleForm: FC<ArticleFormProps> = ({
  defaultValues,
  actionType,
}) => {
  const styles = useStyles({})
  const user = useUser()
  const articleId = defaultValues._id

  const [success, setSuccess] = useState<{ _id: string } | false>(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const savedFilenames = useRef(
    [defaultValues?.thumbnail]
      .filter((fn) => typeof fn === 'string')
      .map((fn) => fn.split('/').slice(-1)[0])
  )

  const deletedFilenames = useRef<string[]>([])

  const { control, handleSubmit, getValues } = useForm({ defaultValues })

  const onSubmit = handleSubmit((article) => {
    if (saving) return

    setSuccess(false)
    setSaving(true)

    graphqlReq(actionType === 'update' ? UPDATE_ARTICLE : CREATE_ARTICLE, {
      input: article,
      filenames: deletedFilenames.current,
    })
      .then(({ article: { _id } }) => {
        setSuccess({ _id })
        graphqlReq(CREATE_LOG, {
          input: {
            "userId": user?._id,
            "description": {
              "en": actionType === 'update' ? "Update article "+_id : "Create article"+_id,
              "es": ""
            }
          }
        })
      })
      .catch(() => {
        toast('An error occurred, please try again.')
      })
      .finally(() => {
        setSaving(false)
      })
  })

  const onAssetDelete = (filename: string) => {
    if (savedFilenames.current.includes(filename)) {
      deletedFilenames.current.push(filename)
    } else {
      graphqlReq(DELETE_FILES, { filenames: [filename] })
    }
  }

  const [initialKeywords, setInitialKeywords] = useState<BaseKeyword[]>([])

  useEffect(() => {
    ;(async () => {
      const { keywords: initialKeywords } = await graphqlReq(GET_KEYWORDS)
      setInitialKeywords(
        initialKeywords.map((keyword: any) => ({
          ...keyword,
          name: keyword.name.en,
        }))
      )
      setLoading(false)
    })()
  }, [])

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>

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

        <KeywordsSelect
          name="keywordsIds"
          initialKeywords={initialKeywords}
          control={control}
          getValues={() => getValues()['keywordsIds']}
        />

        <div css={styles.footer}>
          <div>
            <Button type="submit" disabled={saving}>
              {actionType === 'create' ? 'Create' : 'Save'}
            </Button>

            <div css={{ marginTop: 16, minHeight: 50 }}>
              {success && (
                <>
                  <div style={{ marginBottom: 8 }}>
                    <p style={{ color: '#1b5e20' }}>
                      {actionType === 'update' ? 'Updated' : 'Created'}{' '}
                      Successfully!{' '}
                      <StyledLink href={`/blog/${success ? success._id : ''}`} native>
                        View it
                      </StyledLink>
                    </p>
                  </div>

                  <RevalidateIndictor
                    {...revalidateArticle({ _id: success._id }, actionType)}
                  />
                </>
              )}
            </div>
          </div>

          {actionType === 'update' && articleId && (
            <ItemDeleteButton
              css={styles.deleteBtnSection}
              mutation={DELETE_ARTICLE}
              itemId={articleId}
              getRevalidateInfo={() =>
                revalidateArticle({ _id: articleId }, 'delete')
              }
              redirect="/blog"
              itemType="article"
            />
          )}
        </div>
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
  deleteBtnSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}))
