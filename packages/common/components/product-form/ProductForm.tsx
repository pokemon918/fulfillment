import { useForm, useFieldArray } from 'react-hook-form'
import { TableForm, Paper, Button, StyledLink, Select, Input, Checkbox } from '../../ui'
import { gql } from 'graphql-request'
import { FC, useRef, useState, MutableRefObject } from 'react'
import { CountrySelect } from '../CountrySelect'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LangField } from '../../types'
import { ThumbnailInput } from '../ThumbnailInput'
import {
  makeStyles,
  graphqlReq,
  revalidateProduct,
  revalidateCrossPaths,
} from '../../utils'
import { DeleteIcon, AddIcon } from '../../icons'
import { GalleryForm } from '../gallery/GalleryForm'
import { RevalidateIndictor } from '../RevalidateIndictor'
import { ItemDeleteButton } from '../ItemDeleteButton'
import useHistoryRef from '../../hooks/useHistoryRef'

const GET_CATEGORIES = gql`
  {
    categories {
      _id
      name {
        en
      }
    }
  }
`

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!, $filenames: [String!]!) {
    product: createProduct(input: $input) {
      _id
      categoryId
    }
    deleteFiles(filenames: $filenames)
  }
`

const Update_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!, $filenames: [String!]!) {
    product: updateProduct(input: $input) {
      _id
      categoryId
    }
    deleteFiles(filenames: $filenames)
  }
`

const DELETE_PRODUCT = gql`
  mutation ($_id: String!) {
    deleteProduct(_id: $_id)
  }
`

const DELETE_FILES = gql`
  mutation ($filenames: [String!]!) {
    deleteFiles(filenames: $filenames)
  }
`

const HARVESTING_MONTHS = [
  { value: 0, label: 'January' },
  { value: 1, label: 'February' },
  { value: 2, label: 'March' },
  { value: 3, label: 'April' },
  { value: 4, label: 'May' },
  { value: 5, label: 'June' },
  { value: 6, label: 'July' },
  { value: 7, label: 'August' },
  { value: 8, label: 'September' },
  { value: 9, label: 'October' },
  { value: 10, label: 'November' },
  { value: 11, label: 'December' },
]

export interface ProductFormValue {
  _id?: string
  name: LangField
  categoryId?: string
  country: string
  hsCode: LangField
  price: string
  bigTitle: LangField
  description: LangField
  offerPrices: {
    name: LangField
    value: LangField
  }[]
  thumbnail: string
  gallery: { src: string }[]
  specs: {
    name: LangField
    value: LangField
  }[]
  availableSpecs: LangField
  traces: {
    title: LangField
    description: LangField
    gallery: { src: string }[]
  }[]
  certifications: { src: string }[]
  harvestingMonths: number[]
  isSustainable: boolean
}

interface ProductFormProps {
  defaultValues: ProductFormValue
  actionType: 'create' | 'update'
  isDialog?: boolean
  dialogAction?: () => void
  successId?: MutableRefObject<string>
}

export const ProductForm: FC<ProductFormProps> = ({
  defaultValues,
  actionType,
  isDialog,
  dialogAction,
  successId,
}) => {
  const productId = defaultValues._id

  const styles = useStyles({})
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [success, setSuccess] = useState<false | { _id: string }>(false)
  const categoryIdRef = useHistoryRef(defaultValues.categoryId)
  const router = useRouter()

  const savedFilenames = useRef(
    (() => {
      const _files = []

      if (defaultValues.thumbnail) _files.push(defaultValues.thumbnail)

      defaultValues.gallery?.forEach((f) => _files.push(f.src))
      defaultValues.traces?.forEach((trace) =>
        trace.gallery.forEach((f) => _files.push(f.src))
      )
      defaultValues.certifications?.forEach((f) => _files.push(f.src))

      return _files.map((fn) => fn.split('/').slice(-1)[0])
    })()
  )

  const deletedFilenames = useRef<string[]>([])

  const { control, handleSubmit } = useForm({
    defaultValues,
  })

  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    ;(async () => {
      const res = await graphqlReq(GET_CATEGORIES)

      setCategories(
        res.categories.map((c: any) => ({
          label: c.name.en,
          value: c._id,
        }))
      )

      setLoading(false)
    })()
  }, [])

  const {
    fields: traces,
    remove: removeTrace,
    append: appendTrace,
  } = useFieldArray({
    control,
    name: 'traces',
  })

  const appendNewTrace = () =>
    appendTrace({
      title: {
        en: '',
        es: '',
      },
      description: {
        en: '',
        es: '',
      },
      gallery: [],
    })

  const onAssetDelete = (filename: string) => {
    if (savedFilenames.current.includes(filename)) {
      deletedFilenames.current.push(filename)
    } else {
      graphqlReq(DELETE_FILES, { filenames: [filename] })
    }
  }

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>

  const onSubmit = handleSubmit((product) => {
    const input = {
      ...product,
      price: Number(product.price),
      gallery: product.gallery.map((f) => f.src),
      traces: product.traces.map((trace) => ({
        ...trace,
        gallery: trace.gallery.map((f) => f.src),
      })),
      certifications: product.certifications.map((f) => f.src),
    }

    setSaving(true)
    setSuccess(false)

    graphqlReq(actionType === 'update' ? Update_PRODUCT : CREATE_PRODUCT, {
      input,
      filenames: deletedFilenames.current,
    })
      .then(({ product: { _id, categoryId } }) => {
        setSuccess({ _id })
        if(successId) successId.current = _id;
        categoryIdRef.append(categoryId)
      })
      .catch(() => {
        alert('an error occur please try again')
        setSaving(false)
      })
      .finally(() => setSaving(false))
  })

  return (
    <div>
      <h1 style={{ fontSize: 25, marginBottom: '2rem' }}>
        {actionType === 'create' ? 'Create' : 'Update'} Product
      </h1>

      <form onSubmit={onSubmit}>
        <Input
          style={{ marginBottom: '1.5rem' }}
          label="Name"
          placeholder="Name"
          control={control}
          name="name.en"
          required
        />

        <Select
          style={{ marginBottom: '1.5rem' }}
          label="Category"
          placeholder="Category"
          name="categoryId"
          control={control}
          options={categories}
        />

        <CountrySelect
          style={{ marginBottom: '1.5rem' }}
          control={control}
          name="country"
        />

        <Select
          style={{ marginBottom: '1.5rem' }}
          label="Harvesting Seasonality"
          placeholder="Harvesting Seasonality"
          name="harvestingMonths"
          control={control}
          options={HARVESTING_MONTHS as any}
          isMulti
        />

        <Input
          style={{ marginBottom: '1.5rem' }}
          label="Available Specs"
          placeholder="Available Specs"
          control={control}
          name="availableSpecs.en"
          required
        />

        <Input
          style={{ marginBottom: '1.5rem' }}
          label="HS Code"
          placeholder="HS Code"
          control={control}
          name="hsCode.en"
          required
        />

        <Input
          style={{ marginBottom: '1.5rem' }}
          label="Price"
          placeholder="Price"
          control={control}
          name="price"
          required
          pattern="[0-9]+(\.[0-9]+)?"
        />

        <Input
          style={{ marginBottom: '1.5rem' }}
          label="Description"
          placeholder="Description"
          name="description.en"
          control={control}
          multiline
          rows={5}
        />

        <Checkbox
          style={{ display: 'flex', marginBottom: 20 }}
          label="Is sustainable?"
          name="isSustainable"
          control={control}
        />

        <TableForm
          style={{ marginBottom: '1.5rem' }}
          control={control}
          name="offerPrices"
          label="Offer Prices"
        />

        <p style={{ fontSize: 14, marginBottom: 8 }}>Thumbnail</p>

        <ThumbnailInput
          style={{ marginBottom: '1.5rem' }}
          name="thumbnail"
          control={control}
          onDelete={onAssetDelete}
        />

        <GalleryForm
          style={{ marginBottom: '5rem' }}
          control={control}
          name="gallery"
          label="Main Gallery"
          onDelete={onAssetDelete}
        />

        {/* <h3 style={{ marginBottom: '1rem' }} css={styles.heading}>
          Product Details
        </h3> */}

        {/* <Input
          style={{ marginBottom: '1.5rem' }}
          label="Title"
          placeholder="Title"
          control={control}
          name="bigTitle.en"
          required
        /> */}

        {/* <Input
          style={{ marginBottom: '1.5rem' }}
          label="Description"
          placeholder="Description"
          name="description.en"
          control={control}
          required
          multiline
          rows={5}
        /> */}

        {/* <TableForm
          style={{ marginBottom: '5rem' }}
          control={control}
          name="specs"
          label="Specifications"
        /> */}

        <h3 style={{ marginBottom: '1rem' }} css={styles.heading}>
          Process from Farm to Buyer
        </h3>

        {traces.map((trace, index) => (
          <Paper
            key={trace.id}
            css={styles.trace}
            style={{ marginBottom: '1.5rem' }}
          >
            <Input
              style={{ marginBottom: '1.5rem' }}
              label="Title"
              placeholder="Title"
              name={`traces.${index}.title.en`}
              control={control}
              required
            />

            <Input
              style={{ marginBottom: '1.5rem' }}
              className="mb-1"
              label="Description"
              placeholder="Description"
              name={`traces.${index}.description.en`}
              control={control}
              multiline
              rows={5}
              required
            />

            <GalleryForm
              control={control}
              name={`traces.${index}.gallery`}
              label="Gallery"
              onDelete={onAssetDelete}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 16,
              }}
            >
              <Button
                type="button"
                variant="outlined"
                style={{
                  cursor: 'pointer',
                  color: 'rgb(185, 28, 28)',
                  borderColor: 'rgb(185, 28, 28)',
                  padding: '6px 12px',
                }}
                tabIndex={-1}
                startIcon={<DeleteIcon />}
                onClick={() => removeTrace(index)}
              >
                Delete
              </Button>
            </div>
          </Paper>
        ))}

        <div style={{ marginBottom: '5rem' }}>
          <Button
            type="button"
            variant="outlined"
            style={{
              cursor: 'pointer',
              padding: '6px 12px',
            }}
            tabIndex={-1}
            startIcon={<AddIcon />}
            onClick={appendNewTrace}
          >
            New Trace
          </Button>
        </div>

        {/* <h3
          style={{ marginTop: '5rem', marginBottom: '1rem' }}
          css={styles.heading}
        >
          Certifications
        </h3>

        <GalleryForm
          style={{ marginBottom: '5rem' }}
          control={control}
          name="certifications"
          onDelete={onAssetDelete}
        /> */}

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
                    <StyledLink
                      href={`/products/${success ? success._id : ''}`}
                      native
                    >
                      View it
                    </StyledLink>
                  </p>
                </div>
              )}

              {success && (
                <RevalidateIndictor
                  {...revalidateProduct(
                    {
                      _id: success._id,
                      categoryIds: [
                        categoryIdRef.prev(),
                        categoryIdRef.current(),
                      ],
                    },
                    actionType
                  )}
                  callback={isDialog? dialogAction: () => {}}
                />
              )}
            </div>
          </div>

          {actionType === 'update' && productId && categoryIdRef.current() && (
            <ItemDeleteButton
              css={styles.deleteBtnSection}
              mutation={DELETE_PRODUCT}
              itemId={productId}
              getRevalidateInfo={() =>
                revalidateProduct(
                  {
                    _id: productId,
                    categoryIds: [categoryIdRef.current()],
                  },
                  'delete'
                )
              }
              redirect="/products"
              itemType="product"
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
