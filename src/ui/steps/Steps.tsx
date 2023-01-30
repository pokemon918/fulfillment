import makeStyles from '@/utils/makeStyles'
import { FC } from 'react'
import BoxRation from '../BoxRatio'
import Step from './Step'

interface StepsProps {
  steps: {
    title: string
    description: string
    gallery: string[]
  }[]
}

const Steps: FC<StepsProps> = (props) => {
  const styles = useStyles(props)

  const { steps } = props

  return (
    <div css={styles.root}>
      <div css={styles.startPoint} />
      {steps.map((step, stepIdx) => {
        const galleryNode = (
          <div css={styles.gallery}>
            {step.gallery.map((galleryItem, idx) => {
              let isVideo = ['webm', 'mp4'].includes(
                galleryItem.split('.').at(-1) as any
              )

              return (
                <BoxRation
                  key={galleryItem + idx}
                  css={styles.galleryItemBox}
                  ration={1}
                  data-size={step.gallery.length > 1 ? 'sm' : 'lg'}
                >
                  {isVideo ? (
                    <video
                      css={styles.galleryItem}
                      controls
                      src={galleryItem}
                    />
                  ) : (
                    <img css={styles.galleryItem} src={galleryItem} />
                  )}
                </BoxRation>
              )
            })}
          </div>
        )

        return (
          <Step
            key={stepIdx}
            css={styles.step}
            title={step.title}
            desc={step.description}
            gallery={galleryNode}
            stepNum={('0' + (stepIdx + 1)).slice(-2)}
            reversed={stepIdx % 2 == 1}
            bottomSpace={80}
            verticalConnect={stepIdx + 1 < steps.length}
          />
        )
      })}
    </div>
  )
}

const useStyles = makeStyles(({}: StepsProps) => {
  return {
    root: {
      
    },
    step: {},
    startPoint: {
      position: 'relative',
      height: 100,
      '::after': {
        content: '""',
        position: 'absolute',
        height: 16,
        width: 16,
        background: '#B1DA50',
        borderRadius: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      '::before': {
        content: '""',
        position: 'absolute',
        width: 1,
        height: '100%',
        background: '#B1DA50',
        top: 0,
        left: 'calc(50% - 0.5px)',
        zIndex: -1,
      },
    },
    galleryItemBox: {
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
    galleryItem: {
      borderRadius: '50%',
      background: '#212121',
      objectFit: 'cover',
      height: '100%',
      width: '100%',
    },
    gallery: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginRight: -12,
      marginBottom: -12,
    },
  }
})

export default Steps
