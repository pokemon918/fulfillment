import { FC, HTMLAttributes, useState } from 'react'
import { gql } from 'graphql-request'
import { Button } from '../ui'
import { useRouter } from 'next/router'
import { RevalidateIndictor, RevalidateInfo } from './RevalidateIndictor'
import { graphqlReq, makeStyles } from '../utils'
import { toast } from 'react-toastify'
import { useUser } from "../hooks";

const CREATE_LOG = gql`
  mutation createLog($input: CreateLogInput!) {
    createLog(input: $input)  {
      _id
    }
  }
`

interface ItemDeleteButtonProps extends HTMLAttributes<HTMLDivElement> {
  itemId: string
  mutation: string
  redirect: string
  itemType: string
  log_name: string
  getRevalidateInfo: () => RevalidateInfo
  errorFormatter?: (e: any) => string
}

export const ItemDeleteButton: FC<ItemDeleteButtonProps> = (props) => {
  const [deleting, setDeleting] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const user = useUser()

  const styles = useStyles(props)
  const router = useRouter()

  const {
    itemId,
    mutation,
    itemType,
    log_name,
    redirect,
    getRevalidateInfo,
    errorFormatter,
    ...divProps
  } = props

  const onDelete = async () => {
    if (deleting) return

    const isConfirmed = window.confirm(
      `Are you sure you want to delete this ${itemType}?`
    )

    if (!isConfirmed) return

    setDeleting(true)
    ;(async () => {
      try {
        await graphqlReq(mutation, { _id: itemId })
        setDeleted(true)
        await graphqlReq(CREATE_LOG, {
          input: {
            "userId": user?._id,
            "description": {
              "en": "Delete "+itemType+" "+log_name,
              "es": ""
            }
          }
        })
      } catch (e: any) {
        const formatted = errorFormatter
          ? errorFormatter(e)
          : 'Please check your internet connection'
        toast(formatted)
        setDeleting(false)
      }
    })()
  }

  let note: string | null = null
  if (deleted) {
    note = 'Deleted'
  } else if (deleting) {
    note = 'Deleting...'
  }

  return (
    <div {...divProps}>
      <Button
        type="button"
        style={{
          background: '#f44336',
          color: '#fff',
        }}
        disabled={deleting}
        onClick={onDelete}
      >
        Delete
      </Button>

      <div css={styles.notes}>
        {note && <p css={{ color: '#f44336', marginBottom: 8 }}>{note}</p>}

        {deleted && (
          <RevalidateIndictor
            {...getRevalidateInfo()}
            callback={() => {
              window.location.href = redirect
            }}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: ItemDeleteButtonProps) => ({
  notes: {
    marginTop: 16,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}))
