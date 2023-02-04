import { useForm, useFieldArray } from 'react-hook-form'
import GalleryForm from '@/components/gallery/GalleryForm'
import TableForm from '@/ui/TableForm'
import Input from '@/ui/Input'
import { gql } from 'graphql-request'
import { FC, useRef, useState } from 'react'
import CountrySelect from '@/components/CountrySelect'
import Select from '@/ui/Select'
import { useEffect } from 'react'
import traceTitles from '@/data/traceTitles'
import { useRouter } from 'next/router'
import { LangField } from '@/types/lang-field'
import graphqlReq from '@/utils/graphqlReq'
import ThumbnailInput from '@/components/ThumbnailInput'
import makeStyles from '@/utils/makeStyles'
import Paper from '@/ui/Paper'
import Button from '@/ui/Button'
import StyledLink from '@/ui/StyledLink'
import DeleteIcon from '@/icons/DeleteIcon'
import AddIcon from '@/icons/AddIcon'

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
    }
    deleteFiles(filenames: $filenames)
  }
`

const Update_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!, $filenames: [String!]!) {
    product: updateProduct(input: $input) {
      _id
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
}

interface ProductFormProps {
  defaultValues: ProductFormValue
  actionType: 'create' | 'update'
}

const ProductForm: FC<ProductFormProps> = ({ defaultValues, actionType }) => {
  const styles = useStyles({})
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
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

  const onDelete = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this product'
    )

    if (isConfirmed) {
      const { _id } = defaultValues

      setDeleting(true)

      graphqlReq(DELETE_PRODUCT, { _id })
        .then(() => {
          router.push(`/products`)
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
    setIsSuccess(false)

    graphqlReq(actionType === 'update' ? Update_PRODUCT : CREATE_PRODUCT, {
      input,
      filenames: deletedFilenames.current,
    })
      .then(({ product: { _id } }) => {
        if (actionType === 'create') {
          router.push(`/products/${_id}`)
        } else {
          setIsSuccess(true)
        }
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
          style={{ marginBottom: 16 }}
          label="Name"
          placeholder="Name"
          control={control}
          name="name.en"
          required
        />

        <Select
          style={{ marginBottom: 16 }}
          label="Category"
          placeholder="Category"
          name="categoryId"
          control={control}
          options={categories}
        />

        <CountrySelect
          style={{ marginBottom: 16 }}
          control={control}
          name="country"
        />

        <Select
          style={{ marginBottom: 16 }}
          label="Harvesting Seasonality"
          placeholder="Harvesting Seasonality"
          name="harvestingMonths"
          control={control}
          options={HARVESTING_MONTHS as any}
          isMulti
        />

        <Input
          style={{ marginBottom: 16 }}
          label="HS Code"
          placeholder="HS Code"
          control={control}
          name="hsCode.en"
          required
        />

        <Input
          style={{ marginBottom: 16 }}
          label="Price"
          placeholder="Price"
          control={control}
          name="price"
          required
          pattern="[0-9]+(\.[0-9]+)?"
        />

        <TableForm
          style={{ marginBottom: '5rem' }}
          control={control}
          name="offerPrices"
          label="Offer Prices"
        />

        <p style={{ fontSize: 14, marginBottom: 8 }}>Thumbnail</p>

        <ThumbnailInput
          style={{ marginBottom: 16 }}
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

        <h3 style={{ marginBottom: '1rem' }} css={styles.heading}>
          Product Details
        </h3>

        <Input
          style={{ marginBottom: '1.5rem' }}
          label="Title"
          placeholder="Title"
          control={control}
          name="bigTitle.en"
          required
        />

        <Input
          style={{ marginBottom: '1.5rem' }}
          label="Description"
          placeholder="Description"
          name="description.en"
          control={control}
          required
          multiline
          rows={5}
        />

        <Input
          style={{ marginBottom: '1.5rem' }}
          label="Available Specs"
          placeholder="Available Specs"
          control={control}
          name="availableSpecs.en"
          required
        />

        <TableForm
          style={{ marginBottom: '5rem' }}
          control={control}
          name="specs"
          label="Specifications"
        />

        <h3 style={{ marginBottom: '1rem' }} css={styles.heading}>
          Traceability from Farm to Table
        </h3>

        {traces.map((trace, index) => (
          <Paper
            key={trace.id}
            css={styles.trace}
            style={{ marginBottom: '2rem' }}
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

        <h3
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
          <StyledLink href={`/products/${defaultValues._id}`}>
            View it
          </StyledLink>
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

export default ProductForm
