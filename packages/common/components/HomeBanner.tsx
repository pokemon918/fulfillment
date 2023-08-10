import { css } from '@emotion/react'
import { FC, HTMLAttributes } from 'react'
import { Container } from '../ui'
import { Button } from '../ui/Button'
import { makeStyles } from '../utils'
import { Navbar } from './Navbar'
import bannerCover from '../assets/images/home-banner-cover.jpg'
import { homeData } from '../data'
import { theme } from '../theme'

interface HomeBannerProps extends HTMLAttributes<HTMLDivElement> {
  action?: 'products' | 'investments'
}

export const HomeBanner: FC<HomeBannerProps> = (props) => {
  const styles = useHomeBannerStyles(props)

  const { action = 'products', ...divProps } = props

  return (
    <>
      <div css={styles.root} {...divProps}>
        <Navbar css={styles.navbar} mode="dark" />

        <Container css={styles.content}>
          <div css={styles.body}>
            <div css={styles.heading}>
              <h1 css={styles.heading1}>{homeData.banner.title1}
                <span css={styles.heading2}>{homeData.banner.title2}</span>
              </h1>
            </div>
            <p css={styles.desc}>{homeData.banner.content}</p>

            <Button
              href={`/${action}`}
              variant="outlined"
              fontColor="#fff"
              css={styles.browseBtn}
              rounded
            >
              Browse {action === 'investments' ? 'Products' : 'Products'}
            </Button>
          </div>
        </Container>
      </div>
    </>
  )
}

const useHomeBannerStyles = makeStyles(() => ({
  root: css`
    width: 100%;
    background: linear-gradient(
        90deg,
        rgba(0, 0.5, 1, 0.8) 25.67%,
        rgba(0, 0.5, 1, 0.7) 77.1%
      ),
      url(${bannerCover.src}), #ffffff;
    background-blend-mode:unset;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 65vh;
    min-height: 620px;
    display: flex;
    flex-direction: column;
  `,
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: 1,
    marginLeft: 96,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      marginLeft: 0,
    },
  },
  navbar: {
    flexShrink: 0,
  },
  body: {
    flexGrow: 1,
    width: '100%',
    color: '#fff',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      alignItems: 'center',
    },
  },
  heading: {
    maxWidth: 700,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap',
    color: '#A8EFA8',
    marginBottom: 15,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      whiteSpace: 'inherit',
      justifyContent: 'center',
    },
  },
  heading1: {
    width: '100%',
    fontSize: '48px',
    fontWeight: 600,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      fontSize: 38,
    },
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      fontSize: 32,
    },
  },
  heading2: {
    width: '100%',
    fontSize: '48px',
    fontWeight: 300,
    marginLeft: 15,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      fontSize: 38,
      marginLeft: 10,
    },
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      fontSize: 32,
    },
  },
  desc: {
    width: '100%',
    maxWidth: 680,
    marginBottom: 15,
    fontWeight: 500,
    textAlign: 'left',
    fontSize: '18px',
    lineHeight: '28px',
    whiteSpace: 'pre-wrap',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      textAlign: 'center',
    },
  },
  browseBtn: {
    width: 259,
    height: 59,
    fontSize: 18,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      width: 220,
      height: 50,
    },
  }
}))
