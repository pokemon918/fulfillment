import theme from '@/theme'
import makeStyles from '@/utils/makeStyles'
import { FC, useEffect, useState } from 'react'

interface ExcerptGalleryProps {
  gallery: string[]
}

const ExcerptGallery: FC<ExcerptGalleryProps> = (props) => {
  const styles = useStyles(props)

  const { gallery } = props

  const firstImage = gallery[0]

  const [selected, setSelected] = useState(firstImage)

  useEffect(() => {
    setSelected(firstImage)
  }, [firstImage])

  return (
    <div css={styles.root}>
      <img css={styles.selectedImage} src={selected} alt="" />

      <div css={styles.sidebarWrapper}>
        <div css={styles.sidebar}>
          {gallery.map((image, idx) => (
            <img
              key={image + idx}
              css={styles.galleryImage}
              src={image}
              alt=""
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
    objectFit: 'cover',
    marginBottom: 8,
    borderRadius: 12,
  },
  sidebarWrapper: {
    width: '100%',
    height: 100,
    overflow: 'hidden'
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
    }
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 12,
    cursor: 'pointer',
  },
}))

export default ExcerptGallery
