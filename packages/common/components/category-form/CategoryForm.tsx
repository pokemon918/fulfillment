import { useForm } from 'react-hook-form'
import { Input } from '../../ui'
import { gql } from 'graphql-request'
import { FC, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { LangField } from '../../types'
import { graphqlReq, makeStyles, revalidateCategory } from '../../utils'
import { ThumbnailInput } from '../../components/ThumbnailInput'
import { Button, StyledLink } from '../../ui'
import { RevalidateIndictor } from '../RevalidateIndictor'
import { ItemDeleteButton } from '../ItemDeleteButton'
import { toast } from 'react-toastify'

const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $filenames: [String!]!
  ) {
    category: createCategory(input: $input) {
      _id
    }
    deleteFiles(filenames: $filenames)
  }
`

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $filenames: [String!]!
  ) {
    category: updateCategory(input: $input) {
      _id
    }
    deleteFiles(filenames: $filenames)
  }
`

const DELETE_CATEGORY = gql`
  mutation ($_id: String!) {
    deleteCategory(_id: $_id)
  }
`

const DELETE_FILES = gql`
  mutation ($filenames: [String!]!) {
    deleteFiles(filenames: $filenames)
  }
`

export interface CategoryFormValue {
  _id?: string
  name: LangField
  thumbnail: string
}

interface CategoryFormProps {
  defaultValues: CategoryFormValue
  actionType: 'create' | 'update'
}

export const CategoryForm: FC<CategoryFormProps> = ({
  defaultValues,
  actionType,
}) => {
  const styles = useStyles({})

  const [success, setSuccess] = useState<{ _id: string } | false>(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const categoryId = defaultValues._id
  const router = useRouter()
  const savedFilenames = useRef(
    [defaultValues?.thumbnail]
      .filter((fn) => typeof fn === 'string')
      .map((fn) => fn.split('/').slice(-1)[0])
  )

  const deletedFilenames = useRef<string[]>([])

  const { control, handleSubmit } = useForm({ defaultValues })

  const onSubmit = handleSubmit((category) => {
    setSuccess(false)
    setSaving(true)

    graphqlReq(actionType === 'update' ? UPDATE_CATEGORY : CREATE_CATEGORY, {
      input: category,
      filenames: deletedFilenames.current,
    })
      .then(({ category: { _id } }) => {
        setSuccess(_id)
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

  return (
    <div>
      <h1 style={{ fontSize: 25, marginBottom: '2rem' }}>
        {actionType === 'create' ? 'Create' : 'Update'} Category
      </h1>

      <form onSubmit={onSubmit}>
        <Input
          style={{ marginBottom: 16 }}
          label="Name"
          placeholder="Name"
          control={control}
          name="name.en"
          required
        />

        <p style={{ fontSize: 14, marginBottom: 8 }}>Thumbnail</p>

        <ThumbnailInput
          style={{ marginBottom: 16 }}
          name="thumbnail"
          control={control}
          onDelete={onAssetDelete}
        />

        <div css={styles.footer}>
          <div>
            <Button type="submit" disabled={saving}>
              {actionType === 'create' ? 'Create' : 'Save'}
            </Button>

            <div css={{ marginTop: 16, minHeight: 50 }}>
              {success && (
                <div style={{ marginBottom: 8 }}>
                  <p style={{ color: '#1b5e20' }}>
                    {actionType === 'update' ? 'Updated' : 'Created'}{' '}
                    Successfully!{' '}
                    <StyledLink href={`/categories`} native>View it</StyledLink>
                  </p>
                </div>
              )}

              {success && (
                <RevalidateIndictor
                  {...revalidateCategory({ _id: success._id }, actionType)}
                />
              )}
            </div>
          </div>

          {actionType === 'update' && categoryId && (
            <ItemDeleteButton
              css={styles.deleteBtnSection}
              mutation={DELETE_CATEGORY}
              itemId={categoryId}
              getRevalidateInfo={() =>
                revalidateCategory({ _id: categoryId }, 'delete')
              }
              redirect="/categories"
              itemType="category"
              errorFormatter={() => 'Cannot delete this category because it has associated products'}
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
