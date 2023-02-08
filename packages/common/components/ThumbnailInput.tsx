import { Control, Controller } from 'react-hook-form'
import { CSSProperties, FC } from 'react'
import { DeleteIcon } from '../icons'
import { AssetUpload } from './AssetUpload'
import { makeStyles } from '../utils'

interface ThumbnailInputProps {
  className?: string
  style?: CSSProperties
  control: Control<any>
  name: string
  fullWidth?: boolean
  onDelete: (fileName: string) => void
}

export const ThumbnailInput: FC<ThumbnailInputProps> = ({
  className,
  style,
  control,
  name,
  fullWidth,
  onDelete,
}) => {
  const styles = useStyles({})

  return (
    <div className={className} style={style}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          return value ? (
            <div css={styles.thumbnail} data-full-width={fullWidth}>
              <img
                css={styles.img}
                data-full-width={fullWidth}
                src={value}
                alt=""
              />

              <button
                css={styles.deleteBtn}
                className="text-red-700 bg-zinc-100 disabled:text-gray-300 p-1 rounded"
                tabIndex={-1}
                onClick={() => {
                  const filename = value.split('/').slice(-1)[0]
                  onChange('')
                  if (onDelete) onDelete(filename)
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          ) : (
            <AssetUpload
              css={styles.assetUpload}
              data-full-width={fullWidth}
              single
              onUploaded={(assetUrl) => onChange(assetUrl)}
            />
          )
        }}
      />
    </div>
  )
}

const useStyles = makeStyles(() => {
  const box = {
    width: 265,
    height: 315,
    '&[data-full-width="true"]': {
      width: '100%',
      height: 315,
    },
  }

  return {
    assetUpload: box,

    thumbnail: {
      ...box,
      position: 'relative',
      borderRadius: '0.25rem',
      overflow: 'hidden',
    },

    img: {
      ...box,
      objectFit: 'cover',
      borderRadius: '0.25rem',
      overflow: 'hidden',
      border: '1px solid #64748b',
    },

    deleteBtn: {
      position: 'absolute',
      top: 6,
      left: 6,
      color: 'rgb(185, 28, 28)',
      padding: '0.25rem',
      backgroundColor: 'rgb(244, 244, 245)',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      display: 'inline-flex',
      border: 'none',
    },
  }
})
