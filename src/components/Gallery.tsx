import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, useMemo } from 'react'

interface GalleryProps extends HTMLAttributes<HTMLDivElement> {
  gallery: string[]
}

const Gallery: FC<GalleryProps> = (props) => {
  const styles = useStyles(props)

  const { gallery, ...divProps } = props

  const rows = useMemo(() => {
    const result: string[][] = [[], [], []]
    gallery.map((img, imgIdx) => result[imgIdx % 3].push(img))
    return result
  }, [gallery])

  return (
    <div css={styles.root} {...divProps}>
      {rows.map((row, rowIdx) => (
        <div css={styles.column} key={rowIdx}>
          {rows[rowIdx].map((img, imgIdx) => (
            <img key={'' + rowIdx + imgIdx} css={styles.img} src={img} alt="" />
          ))}
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles(({}: GalleryProps) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 20,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    width: '100%',
    '&:not(:last-of-type)': {
      marginBottom: 20,
    },
  },
}))

export default Gallery
