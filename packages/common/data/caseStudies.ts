import sampleImg from '../assets/images/sample-img.jpg'
import certPlaceholder from '../assets/images/certification-placeholder.png'
import kiwiImg from '../assets/images/kiwi.jpg'
import typeImg from '../assets/images/grower.svg'
import cover from 'common/assets/images/case-study-cover.jpg'
import overviewImg from '../assets/images/case-study-img.svg'

export interface CaseStudy {
  slug: string
  profile: {
    name: string
    location: string
    cover: string
    image: string
    type: {
      title: string
      icon: string
    }
  }
  description: string
  overviewImg: string
  certifications: string[]
  journey: {
    title: string
    description: string
    gallery: string[]
  }[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'mango',
    profile: {
      name: 'APROMALPI',
      location: 'Piura, Peru',
      cover: cover.src,
      image: kiwiImg.src,
      type: {
        title: 'Grower / Harvester',
        icon: typeImg.src,
      },
    },
    description:
      'Working in partnership with Catholic Relief Services, NCBA CLUSA will help establish a local Community Development Fund as part of the new $50 million Communities Leading Development Project in Guatemala funded by the U.S. Agency for International Development. Other project partners include Mercy Corps, ADIPO, Caritas Los Altos, and Caritas San Marcos.',
    overviewImg: overviewImg.src,
    certifications: [certPlaceholder.src, certPlaceholder.src],
    journey: [
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
    ],
  },
]
