import {
  caseStudies,
  CaseStudy,
  CaseStudyIntro,
  Container,
  Footer,
  makeStyles,
  Navbar,
  PageBgColor,
  ProfileHeader,
  Steps,
  theme,
} from 'common'
import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

const CaseStudyPage: FC<PageCaseStudyProps> = (props) => {
  const styles = useStyles(props)

  const { caseStudy } = props

  return (
    <div css={styles.root}>
      <PageBgColor bgColor="#f8f8f8" />

      <div css={styles.cover}>
        <Navbar style={{ opacity: 0.95 }} />
      </div>

      <ProfileHeader css={styles.profileHeader} profile={caseStudy.profile} />

      <CaseStudyIntro
        style={{ marginBottom: 116 }}
        overviewImg={caseStudy.overviewImg}
        description={caseStudy.description}
        certifications={caseStudy.certifications}
      />

      <Container style={{ marginBottom: 80 }} maxWidth="md">
        <h3 css={styles.heading}>Production map</h3>
        <Steps steps={caseStudy.journey} />
      </Container>

      <Footer />
    </div>
  )
}

const useStyles = makeStyles(
  ({
    caseStudy: {
      profile: { cover },
    },
  }: PageCaseStudyProps) => ({
    root: {
      fontFamily: theme.fonts.secondary,
    },
    cover: {
      width: '100%',
      height: 356,
      backgroundImage: `url(${cover})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    profileHeader: {
      position: 'relative',
      top: -26,
      marginBottom: -26,
    },
    heading: {
      fontSize: 30,
      fontWeight: 700,
      textAlign: 'center',
      color: '#B1DA50',
      marginBottom: 56,
    },
  })
)

interface PageCaseStudyProps {
  caseStudy: CaseStudy
}

export const getStaticProps: GetStaticProps<PageCaseStudyProps> = (ctx) => {
  const caseStudySlug = ctx.params?.caseStudySlug
  const caseStudy = caseStudies.find(
    (caseStudy) => caseStudy.slug === caseStudySlug
  )

  if (!caseStudy) {
    return { notFound: true }
  }

  return {
    props: { caseStudy },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: caseStudies.map(({ slug }) => ({ params: { caseStudySlug: slug } })),
    fallback: false,
  }
}

export default CaseStudyPage
