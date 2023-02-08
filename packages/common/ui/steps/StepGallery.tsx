import { makeStyles } from '../../utils'
import { FC } from 'react'
import { BoxRation } from '../BoxRatio'

interface StepGalleryProps {
  gallery: string[]
}

export const StepGallery: FC<StepGalleryProps> = (props) => {
  const styles = useStyles(props)

  const { gallery } = props

  return (
    <div css={styles.root}>
      {gallery.map((galleryItem, idx) => {
        let isVideo = ['webm', 'mp4'].includes(
          galleryItem.split('.')[gallery.length - 1] as any
        )

        return (
          <BoxRation
            key={galleryItem + idx}
            css={styles.itemBox}
            ration={1}
            data-size={gallery.length > 1 ? 'sm' : 'lg'}
          >
            {isVideo ? (
              <video css={styles.item} controls src={galleryItem} />
            ) : (
              <img css={styles.item} src={galleryItem} />
            )}
          </BoxRation>
        )
      })}
    </div>
  )
}

const useStyles = makeStyles(({}: StepGalleryProps) => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginRight: -12,
      marginBottom: -12,
    },
    itemBox: {
      marginRight: 12,
      marginBottom: 12,
      width: 'calc(100% - 12px)',
      '&[data-size="sm"]': {
        maxWidth: 210,
      },
      '&[data-size="lg"]': {
        maxWidth: 360,
      },
    },
    item: {
      borderRadius: '50%',
      background: '#212121',
      objectFit: 'cover',
      height: '100%',
      width: '100%',
    },
  }
})
