import { useEffect, useState } from 'react'

const useBase64 = (fileUrl: string): string | null => {
  const [base64, setBase64] = useState<string | null>(null)

  useEffect(() => {
    const fetchFile = async () => {
      const res = await fetch(fileUrl)
      const blob = await res.blob()
      const reader = new FileReader()

      reader.onload = function () {
        setBase64(this.result as string)
      }

      reader.readAsDataURL(blob)
    }

    fetchFile()
  }, [])

  return base64
}

export default useBase64
