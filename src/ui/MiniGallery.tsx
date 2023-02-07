import ZoomIcon from '@/icons/ZoomIcon'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface MiniGalleryProps extends HTMLAttributes<HTMLDivElement> {
  images: string[]
  onClickView: (imageIdx: number) => void
}

const MiniGallery: FC<MiniGalleryProps> = (props) => {
  const { images, onClickView, ...divProps } = props

  const styles = useStyles(props)

  return (
    <div css={styles.root} {...divProps}>
      {images.map((image, imageIdx) => (
        <div
          key={image}
          css={styles.image}
          style={{ backgroundImage: `url(${image})` }}
          onClick={() => onClickView(imageIdx)}
        >
          <ZoomIcon style={{ color: '#fff' }} />
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles(({}: MiniGalleryProps) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: -10,
  },
  image: {
    width: 80,
    height: 80,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginRight: 10,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 4,
    paddingBottom: 4,
    cursor: 'pointer',
  },
}))

export default MiniGallery
