import {
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
import sampleImg from 'common/assets/images/sample-img.jpg'
import cover from 'common/assets/images/case-study-cover.jpg'
import kiwiImg from 'common/assets/images/kiwi.jpg'
import certPlaceholder from 'common/assets/images/certification-placeholder.png'

interface CaseStudyPageProps {}

const steps: {
  title: string
  description: string
  gallery: string[]
}[] = [
  {
    title: 'Plantation',
    description:
      'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: [sampleImg.src],
  },
  {
    title: 'Plantation',
    description:
      'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: [sampleImg.src, sampleImg.src],
  },
  {
    title: 'Plantation',
    description:
      'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: [sampleImg.src],
  },
  {
    title: 'Plantation',
    description:
      'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: [sampleImg.src, sampleImg.src],
  },
]

const CaseStudyPage: FC<CaseStudyPageProps> = (props) => {
  const styles = useStyles(props)

  return (
    <div css={styles.root}>
      <PageBgColor bgColor="#f8f8f8" />

      <div css={styles.cover}>
        <Navbar style={{ opacity: 0.95 }} />
      </div>

      <ProfileHeader
        css={styles.profileHeader}
        profile={{
          title: 'Company name',
          location: 'Guatemala, Guatemala city',
          detail: 'Grower / Harvester',
          imgUrl: kiwiImg.src,
        }}
      />

      <CaseStudyIntro
        style={{ marginBottom: 116 }}
        certifications={[certPlaceholder.src, certPlaceholder.src]}
      />

      <Container style={{ marginBottom: 80 }} maxWidth="md">
        <h3 css={styles.heading}>Production map</h3>
        <Steps steps={steps} />
      </Container>

      <Footer />
    </div>
  )
}

const useStyles = makeStyles(({}: CaseStudyPageProps) => ({
  root: {
    fontFamily: theme.fonts.secondary,
  },
  cover: {
    width: '100%',
    height: 356,
    backgroundImage: `url(${cover.src})`,
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
}))

export default CaseStudyPage
