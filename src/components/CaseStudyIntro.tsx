import Container from '@/ui/Container'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface CaseStudyIntroProps extends HTMLAttributes<HTMLDivElement> {
  certifications: string[]
}

const CaseStudyIntro: FC<CaseStudyIntroProps> = (props) => {
  const styles = useStyles(props)

  const { certifications, ...divProps } = props

  return (
    <div css={styles.wrapper} {...divProps}>
      <img css={styles.decorate} src="/images/blockchain.png" alt="" />
      <Container maxWidth="md">
        <div css={styles.root}>
          <div>
            <div css={styles.text}>
              Working in partnership with Catholic Relief Services, NCBA CLUSA
              will help establish a local Community Development Fund as part of
              the new $50 million Communities Leading Development Project in
              Guatemala funded by the U.S. Agency for International Development.
              Other project partners include Mercy Corps, ADIPO, Caritas Los
              Altos, and Caritas San Marcos.
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

          <img css={styles.img} src="/images/case-study-img.svg" />
        </div>
      </Container>
    </div>
  )
}

const useStyles = makeStyles(({}: CaseStudyIntroProps) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 46,
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
  },
  text: {
    fontSize: 18,
    lineHeight: 1.6,
    marginBottom: 32
  },
  img: {
    width: '100%',
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

export default CaseStudyIntro
