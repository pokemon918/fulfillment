import Container from '@/ui/Container'
import Navbar from '@/components/Navbar'
import Button from '@/ui/Button'
import makeStyles from '@/utils/makeStyles'
import { css } from '@emotion/react'
import { FC, HTMLAttributes } from 'react'

interface HomeBannerProps extends HTMLAttributes<HTMLDivElement> {

}

const HomeBanner: FC<HomeBannerProps> = (props) => {
  const styles = useHomeBannerStyles(props)

  const { ...divProps } = props

  return (
    <>
      <div css={styles.root} {...divProps}>
        <Container css={styles.content}>
          <Navbar css={styles.navbar} mode="dark" />

          <div css={styles.body}>
            <h1 css={styles.heading}>
              Start importing fresh products safely and reliably.
            </h1>

            <p css={styles.desc}>
              We provide a global order fulfillment solution in which we take
              care of everything from production to delivery to ensure that you
              receive quality product that you need safely and reliably.
            </p>

            <Button
              variant="outlined"
              style={{ paddingLeft: 34, paddingRight: 34 }}
              fontColor="#fff"
              size="lg"
              rounded
            >
              Browse Products
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
      url(/images/fruits-bg.jpg), #ffffff;
    background-blend-mode: normal, luminosity, normal;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 65vh;
  `,
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
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

export default HomeBanner
