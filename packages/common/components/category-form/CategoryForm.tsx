import { useForm } from 'react-hook-form'
import { Input } from '../../ui'
import { gql } from 'graphql-request'
import { FC, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { LangField } from '../../types'
import { graphqlReq, makeStyles } from '../../utils'
import { ThumbnailInput } from '../../components/ThumbnailInput'
import { Button, StyledLink } from '../../ui'

const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $filenames: [String!]!
  ) {
    product: createCategory(input: $input) {
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
    Category: updateCategory(input: $input) {
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

  const onSubmit = handleSubmit((category) => {
    setIsSuccess(false)
    setSaving(true)

    graphqlReq(actionType === 'update' ? UPDATE_CATEGORY : CREATE_CATEGORY, {
      input: category,
      filenames: deletedFilenames.current,
    })
      .then(() => {
        if (actionType === 'create') {
          router.push(`/categories`)
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
      'Are you sure you want to delete this category'
    )

    if (isConfirmed) {
      const { _id } = defaultValues

      setDeleting(true)

      graphqlReq(DELETE_CATEGORY, { _id })
        .then(() => {
          router.push(`/categories`)
        })
        .catch(() => {
          alert(
            'Cannot delete this category because it has associated products'
          )
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
          <StyledLink href={`/categories`}>View it</StyledLink>
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
