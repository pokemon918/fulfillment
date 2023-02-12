import { isVideoUrl, makeStyles } from '../../utils'
import { FC } from 'react'
import { BoxRation } from '../BoxRatio'
import { RoundedVideo } from '../RoundedVideo'

interface StepGalleryProps {
  gallery: string[]
}

export const StepGallery: FC<StepGalleryProps> = (props) => {
  const styles = useStyles(props)

  const { gallery } = props

  return (
    <div css={styles.root}>
      {gallery.map((galleryItem, idx) => {
        let isVideo = isVideoUrl(galleryItem)

        return (
          <BoxRation
            key={galleryItem + idx}
            css={styles.itemBox}
            ration={1}
            data-size={gallery.length > 1 ? 'sm' : 'lg'}
          >
            {isVideo ? (
              <RoundedVideo css={styles.video} src={galleryItem} />
            ) : (
              <div
                css={styles.img}
                style={{ backgroundImage: `url(${galleryItem})` }}
              />
            )}
          </BoxRation>
        )
      })}
    </div>
  )
}

const useStyles = makeStyles(({}: StepGalleryProps) => {
  const itemStyles = {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '50%',
  }

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
    video: {
      ...itemStyles,
      background: '#212121',
    },
    img: {
      ...itemStyles,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }
})
