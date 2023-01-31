import theme from '@/theme'
import Container from '@/ui/Container'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface OverviewProps extends HTMLAttributes<HTMLDivElement> {}

const Overview: FC<OverviewProps> = (props) => {
  const styles = useStyles(props)

  const { ...divProps } = props

  return (
    <div css={styles.wrapper} {...divProps}>
      <div css={styles.imgWrapper}>
        <img src="/images/curvy-dots.png"  />
      </div>

      <Container maxWidth="md">
        <h4 css={styles.heading} style={{ marginBottom: 52 }}>
          Overview of TRU MARKET Fulfillment Solution
        </h4>
      </Container>

      <Container maxWidth="md" style={{ position: 'relative' }}>
        <div css={styles.root}>
          <div css={styles.content}>
            <h3 css={styles.subheading}>TRU Market</h3>
            <p css={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus,
              fermentum amet faucibus sed id nisi lectus at. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Lacus, fermentum amet
              faucibus sed id nisi lectus at. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Lacus, fermentum amet faucibus sed id
              nisi lectus at.
            </p>
          </div>

          <img css={styles.gif} src="/images/fruits-overview.gif" alt="" />
        </div>
      </Container>
    </div>
  )
}

const useStyles = makeStyles((props: OverviewProps) => ({
  wrapper: {
    position: 'relative',
    zIndex: -1,
  },
  imgWrapper: {
    position: 'absolute',
    width: '100%',
    right: 0,
    top: -260,
    overflow: 'hidden',
    zIndex: -1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  root: {
    display: 'grid',
    gridTemplateColumns: '416px 1fr',
    alignItems: 'center',
    gap: 72,
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
    [`@media (max-width: ${theme.widths.tablet})`]: {
      marginBottom: 24,
    },
  },
  heading: {
    fontWeight: 700,
    fontSize: 30,
    lineHeight: 1.25,
    textAlign: 'center',
    color: '#69832C',
  },
  subheading: {
    fontWeight: 500,
    fontSize: 25,
    lineHeight: 1.25,
    marginBottom: 8,
  },
  desc: {
    fontSize: 18,
    lineHeight: 1.5,
  },
  gif: {
    width: '100%',
  },
}))

export default Overview
