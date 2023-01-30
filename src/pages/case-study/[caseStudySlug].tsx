import CaseStudyIntro from '@/components/CaseStudyIntro'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProfileHeader from '@/components/ProfileHeader'
import theme from '@/theme'
import Container from '@/ui/Container'
import PageBgColor from '@/ui/PageBgColor'
import Steps from '@/ui/steps/Steps'
import makeStyles from '@/utils/makeStyles'
import { FC } from 'react'

interface CaseStudyPageProps {}

const steps: {
  title: string
  description: string
  gallery: string[]
}[] = [
  {
    title: 'Plantation',
    description: 'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: ['/images/grape.png'],
  },
  {
    title: 'Plantation',
    description: 'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: ['/images/grape.png', '/images/grape.png'],
  },
  {
    title: 'Plantation',
    description: 'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: ['/images/grape.png'],
  },
  {
    title: 'Plantation',
    description: 'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: ['/images/grape.png', '/images/grape.png'],
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
          imgUrl: '/images/grape.png',
        }}
      />

      <CaseStudyIntro
        style={{ marginBottom: 116 }}
        certifications={[
          '/images/certification-placeholder.png',
          '/images/certification-placeholder.png',
        ]}
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
    backgroundImage: 'url(/images/case-study-cover.jpg)',
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
