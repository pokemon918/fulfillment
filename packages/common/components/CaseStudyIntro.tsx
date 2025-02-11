import { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'
import { Container } from '../ui'
import { makeStyles } from '../utils'
import blockchain from '../assets/images/blockchain.png'

interface CaseStudyIntroProps extends HTMLAttributes<HTMLDivElement> {
  overviewImg: string
  description: string
  certifications: string[]
}

export const CaseStudyIntro: FC<CaseStudyIntroProps> = (props) => {
  const styles = useStyles(props)

  const { certifications, overviewImg, description, ...divProps } = props

  return (
    <div css={styles.wrapper} {...divProps}>
      <img css={styles.decorate} src={blockchain.src} alt="" />
      <Container maxWidth="md">
        <div css={styles.root}>
          <div css={styles.textWrapper}>
            <div css={styles.text}>
              {description}
            </div>

            <div css={styles.certificationsWrapper}>
              <span style={{ marginRight: 26 }}>Certifications</span>

              {certifications.map((certification, idx) => (
                <img
                  key={idx}
                  css={styles.certification}
                  src={certification}
                  alt=""
                />
              ))}
            </div>
          </div>

          <img css={styles.img} src={overviewImg} />
        </div>
      </Container>
    </div>
  )
}

const useStyles = makeStyles(({}: CaseStudyIntroProps) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 46,
    overflow: 'hidden',
  },
  decorate: {
    position: 'absolute',
    right: -10,
    top: -38,
    zIndex: -1,
  },
  root: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr 0.63fr',
    gap: 100,
    alignItems: 'center',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      gridTemplateColumns: '1fr',

      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  textWrapper: {
    [`@media (max-width: ${theme.widths.tablet})`]: {
      maxWidth: 800,
      width: '100%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  text: {
    fontSize: 18,
    lineHeight: 1.6,
    marginBottom: 32,
  },
  img: {
    width: '100%',

    [`@media (max-width: ${theme.widths.tablet})`]: {
      maxWidth: 450,
      width: '100%',
      margin: '0 auto',
      gridColumn: 1,
      gridRow: 1,
    },
  },
  certificationsWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  certification: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    objectFit: 'cover',
    '&:not(:last-of-type)': {
      marginRight: 6,
    },
  },
}))
