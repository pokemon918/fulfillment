import axios from 'axios'
import { getCookie } from './cookies'
import { APP_TYPE } from "../constants/APP_TYPE";

const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/files/upload`

interface UploadFileInput {
  formData: FormData
  onUploadProgress: (progress: number) => void
  relationId?: string
}

export const uploadFile = ({
  formData,
  onUploadProgress,
  relationId,
}: UploadFileInput) => {
  let token: string | null = ''
  if (APP_TYPE === 'fulfillment' || APP_TYPE === 'admin') {
    token = getCookie(document.cookie, `${APP_TYPE}_token`)
  }

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
