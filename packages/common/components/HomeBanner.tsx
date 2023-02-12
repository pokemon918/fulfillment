import { css } from '@emotion/react'
import { FC, HTMLAttributes } from 'react'
import { Container } from '../ui'
import { Button } from '../ui/Button'
import { makeStyles } from '../utils'
import { Navbar } from './Navbar'
import bannerCover from '../assets/images/home-banner-cover.jpg'
import { homeData } from '../data'

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
            <h1 css={styles.heading}>{homeData.banner.title}</h1>

            <p css={styles.desc}>{homeData.banner.content}</p>

            <Button
              href={`/${action}`}
              variant="outlined"
              style={{ paddingLeft: 34, paddingRight: 34 }}
              fontColor="#fff"
              size="lg"
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
        239.41deg,
        rgba(0, 0, 0, 0.7) 25.67%,
        rgba(0, 0, 0, 0.252) 77.1%
      ),
      url(${bannerCover.src}), #ffffff;
    background-blend-mode: normal, luminosity, normal;
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    width: '100%',
    maxWidth: 502,
    fontSize: 36,
    marginBottom: 15,
  },
  desc: {
    width: '100%',
    maxWidth: 664,
    marginBottom: 15,
    fontWeight: 300,
  },
}))
