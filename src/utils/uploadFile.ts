import axios from 'axios'
import { getCookie } from './cookies'

const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/files/upload`

interface UploadFileInput {
  formData: FormData
  onUploadProgress: (progress: number) => void
  relationId?: string
}

const uploadFile = ({
  formData,
  onUploadProgress,
  relationId,
}: UploadFileInput) => {
  const token = getCookie(document.cookie, 'fulfillment-token')

  if (onUploadProgress) onUploadProgress(0)

  const query = relationId ? `?relationId=${relationId}` : ''

  return axios.post(endpoint + query, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },

    onUploadProgress: (progressEvent) => {
      if (onUploadProgress)
        onUploadProgress(
          Math.floor((progressEvent.loaded / progressEvent.total!) * 100)
        )
    },
  })
}

export default uploadFile
