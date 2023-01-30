import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, ReactNode } from 'react'
import StepGallery from './StepGallery'

interface StepProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  stepNum: string
  gallery: string[]
  reversed?: boolean
  bottomSpace?: number
  verticalConnect?: boolean
}

const Step: FC<StepProps> = (props) => {
  const styles = useStyles(props)

  const {
    title,
    description,
    gallery,
    stepNum,
    reversed,
    bottomSpace,
    verticalConnect,
    ...divProps
  } = props

  const galleryNode = (
    <div css={styles.gallery}>
      <StepGallery gallery={gallery} />
    </div>
  )

  const dotNode = (
    <span css={styles.subDotWrapper}>
      <span css={styles.subDot} />
    </span>
  )

  const contentNode = (
    <div css={styles.content}>
      <div css={styles.stepHeadingWrapper}>
        {!reversed && dotNode}
        <h4 css={styles.stepHeading}>{title}</h4>
        {reversed && dotNode}
      </div>

      <p css={styles.stepDesc}>{description}</p>
    </div>
  )

  return (
    <div css={styles.root} {...divProps}>
      {reversed ? contentNode : galleryNode}

      <div css={styles.stepNumWrapper}>
        <div css={styles.stepNum}>{stepNum}</div>
      </div>

      {reversed ? galleryNode : contentNode}
    </div>
  )
}

const useStyles = makeStyles(
  ({ reversed, bottomSpace, verticalConnect }: StepProps) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: 'calc(50% - 44px) 88px calc(50% - 44px)',
    },
    gallery: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: reversed ? 0 : 66,
      paddingLeft: reversed ? 66 : 0,
      paddingBottom: bottomSpace,
    },
    content: {
      paddingTop: 30,
      paddingBottom: bottomSpace,
    },

    smCircleImg: {
      width: 210,
      height: 210,
      borderRadius: '50%',
    },
    lgCircleImg: {
      width: 360,
      height: 360,
      borderRadius: '50%',
    },
    stepNumWrapper: {
      position: 'relative',
      '&::before': verticalConnect
        ? {
            content: '""',
            position: 'absolute',
            width: 1,
            height: '100%',
            background: '#B1DA50',
            top: 0,
            left: 'calc(50% - 0.5px)',
            zIndex: -1,
          }
        : undefined,
    },
    stepNum: {
      position: 'relative',
      width: 88,
      height: 88,
      background: '#B1DA50',
      color: '#fff',
      fontSize: 44,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      lineHeight: 0,
    },
    stepHeadingWrapper: {
      display: 'grid',
      gridTemplateColumns: reversed ? 'auto minmax(182px, 1fr)' : '126px auto',
      marginBottom: 8,
    },
    stepHeading: {
      fontSize: 20,
      fontWeight: 700,
      marginLeft: reversed ? 0 : 20,
      marginRight: reversed ? 20 : 0,
    },
    stepDesc: {
      fontSize: 16,
      paddingLeft: reversed ? 0 : 146,
      paddingRight: reversed ? 146 : 0,
      '@media (max-width: 1172px)': {
        paddingRight: reversed ? 60 : undefined,
      },
    },
    subDotWrapper: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: reversed ? undefined : 'end',
      paddingTop: 4,
      // background: 'red',
      '::after': {
        content: '""',
        width: '100%',
        height: 1,
        background: '#B1DA50',
        position: 'absolute',
        top: 'calc(50% - 0.5px)',
        right: 0,
      },
    },
    subDot: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      display: 'inline-flex',
      background: '#B1DA50',
    },
  })
)

export default Step
