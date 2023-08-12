import { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'
import { makeStyles } from '../utils'
import curvyDots from '../assets/images/curvy-dots.png'
import overviewGif from '../assets/images/overview.gif'
import { homeData } from '../data'

interface OverviewProps extends HTMLAttributes<HTMLDivElement> { }

export const Overview: FC<OverviewProps> = (props) => {
  const styles = useStyles(props)

  const { ...divProps } = props

  return (
    <div css={styles.wrapper} {...divProps}>
      <h4 css={styles.heading}>
        How <span css={styles.caption}>TRU MARKET</span> is shaping the way to conduct international business
      </h4>
      <div css={styles.root}>
        <div css={styles.content}>
          <h3 css={styles.subheading}>{homeData.solutionsOverview.title}</h3>
          <p css={styles.desc}>{homeData.solutionsOverview.content}</p>
        </div>
        <div css={styles.gifImgWrapper}>
          <div css={styles.imgWrapper}>
            <img src={curvyDots.src} />
          </div>
          <div css={styles.gifWrapper}>
            <img css={styles.gif} src={overviewGif.src} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((props: OverviewProps) => ({
  wrapper: {
    position: 'relative',
    zIndex: -1,
    padding: '74px 0 74px 96px',
    background: '#FCFCFC',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      padding: '50px 16px',
    },
  },
  root: {
    display: 'grid',
    gridTemplateColumns: '60% 40%',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      flexDirection: 'column',
      display: 'flex',
      maxWidth: 600,
      width: '100%',
      margin: '0 auto',
      gap: 0,
      textAlign: 'center',
    },
  },
  content: {
    width: '100%',
    fontSize: 18,
    color: '#000',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      marginBottom: 24,
    },
  },
  caption: {
    fontWeight: 600,
    fontSize: 48,
    lineHeight: 1.25,
    color: '#3BA83B',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      fontSize: 38,
    },
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      fontSize: 32,
    },
  },
  heading: {
    maxWidth: 900,
    fontWeight: 300,
    fontSize: 48,
    lineHeight: 1.25,
    textAlign: 'left',
    color: '#3BA83B',
    paddingBottom: 20,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      textAlign: 'center',
      fontSize: 38,
    },
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      fontSize: 32,
    },
  },
  subheading: {
    fontWeight: 500,
    fontSize: 36,
    lineHeight: 1.25,
    marginBottom: 8,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      textAlign: 'center',
      fontSize: 28,
    },
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      fontSize: 28,
    },
  },
  desc: {
    fontSize: 18,
    lineHeight: 1.5,
  },
  gifImgWrapper: {
    width: '100%',
    marginTop: 50,
    padding: '0 0 0 30px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      padding: 0,
    },
  },
  imgWrapper: {
    position: 'absolute',
    width: '100%',
    height: 350,
    right: 0,
    bottom: 20,
    overflow: 'hidden',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'flex-end',
    pointerEvents: 'none',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'none',
    },
  },
  gifWrapper: {
    width: '100%',
  },
  gif: {
    width: '100%',
  },
}))
