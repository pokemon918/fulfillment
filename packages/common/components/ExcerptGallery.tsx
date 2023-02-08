import { FC, useEffect, useState } from 'react'
import { theme } from '../theme'
import { makeStyles } from '../utils'

interface ExcerptGalleryProps {
  productId: string
  gallery: string[]
}

export const ExcerptGallery: FC<ExcerptGalleryProps> = (props) => {
  const styles = useStyles(props)

  const { productId, gallery } = props

  const firstImage = gallery[0]

  const [selected, setSelected] = useState(firstImage)

  useEffect(() => {
    setSelected(firstImage)
  }, [productId])

  return (
    <div css={styles.root}>
      <div
        css={styles.selectedImage}
        style={{ backgroundImage: `url(${selected})` }}
      />

      <div css={styles.sidebarWrapper}>
        <div css={styles.sidebar}>
          {gallery.map((image, idx) => (
            <div
              key={image + idx}
              css={styles.galleryImage}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setSelected(image)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: ExcerptGalleryProps) => ({
  root: {
    width: '100%',
  },
  selectedImage: {
    width: '100%',
    height: 400,
    marginBottom: 8,
    borderRadius: 12,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  sidebarWrapper: {
    width: '100%',
    height: 100,
    overflow: 'hidden',
  },
  sidebar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 4,
    height: '100%',
    gridTemplateRows: '100%',
    [`@media (max-width: ${theme.widths.mobile})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [`@media (max-width: ${theme.widths.mobileSm})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    cursor: 'pointer',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}))
