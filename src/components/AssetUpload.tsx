import AddIcon from '../icons/AddIcon'
import uploadFile from '@/utils/uploadFile'
import { ChangeEventHandler, FC, useState } from 'react'
import makeStyles from '@/utils/makeStyles'

interface AssetUploadCommonProps {
  className?: string
  single?: boolean
}

interface AssetUploadSingleProps {
  single: true
  onUploaded: (asset: string) => void
}

interface AssetUploadMultiProps {
  single?: false
  onUploaded: (assets: string[]) => void
}

type AssetUploadProps = AssetUploadCommonProps &
  (AssetUploadSingleProps | AssetUploadMultiProps)

const AssetUpload: FC<AssetUploadProps> = ({
  onUploaded,
  className,
  single,
}) => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return

    const formData = new FormData()

    Array.from(e.target.files).forEach((file) => {
      formData.append('files', file)
    })

    uploadFile({
      formData,
      onUploadProgress: (progress) => {
        setUploadProgress(progress)
      },
    })
      .then((res) => {
        onUploaded(single ? res.data[0] : res.data)
      })
      .catch(() => {
        alert('an error occurred while uploading...')
      })
      .finally(() => {
        setUploadProgress(null)
      })

    // @ts-ignore
    e.target.value = null
  }

  const styles = useStyles({})

  return (
    <label css={styles.uploadBtn} className={className}>
      {typeof uploadProgress === 'number' ? (
        <div>
          <p>Uploading</p>
          <p>{uploadProgress}%</p>
        </div>
      ) : (
        <AddIcon style={{ fontSize: 48 }} />
      )}

      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/*, video/*"
        onChange={handleChange}
        multiple={!single}
      />
    </label>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  gallery: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    width: '100%',
    padding: 16,
  },
  assetWrapper: {
    flexShrink: 0,
    paddingRight: 16,
  },
  assetItem: {
    height: '100%',
    width: 'auto',
    borderRadius: '0.25rem',
    overflow: 'hidden',
    border: '1px solid #64748b',
  },
  asset: {
    position: 'relative',
    height: 200,
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: '#64748b',
    cursor: 'pointer',
    width: 100,
    height: 200,
    flexShrink: 0,
    border: '1px solid #64748b',
    borderRadius: '0.25rem',
    overflow: 'hidden',
  },
  deleteBtn: {
    position: 'absolute',
    top: 48,
    left: 6,
  },
  dragBtn: {
    position: 'absolute',
    top: 6,
    left: 6,
  },
}))

export default AssetUpload
