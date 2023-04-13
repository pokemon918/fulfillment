import sampleImg from '../assets/images/sample-img.jpg'
import certPlaceholder from '../assets/images/certification-placeholder.png'
import kiwiImg from '../assets/images/kiwi.jpg'
import typeImg from '../assets/images/grower.svg'
import cover from '../assets/images/case-study-cover.jpg'
import overviewImg from '../assets/images/case-study-img.svg'
import mango from '../assets/images/20230111_125139.jpg'

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
    slug: 'ginger',
    profile: {
      name: 'RTE Amazon',
      location: 'Pichanaki, Peru',
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
          `The production of organic fresh mango begins in carefully nurtured orchards located in the northern regions of Peru - at Tambogrande - in orchads where the mango trees are cultivated with utmost care and precision. From planting to harvesting, every step is crucial in ensuring the highest quality mangoes reach the consumers' table. TRU MARKET's innovative platform has enabled traceability in the production orchards, bringing transparency and trust to the entire journey.

Through smart contracts, TRU MARKET ensures that suppliers comply with all the milestones of the operation. This includes using certified organic farming practices, adhering to Codex Alimentarius standards for food safety, and obtaining relevant certifications such as GlobalGAP for good agricultural practices. TRU MARKET's platform records and verifies each operation in real-time, creating an immutable and transparent audit trail.

With TRU MARKET's technology, buyers can confidently trace the origin of the mangoes, ensuring that they are sourced from reputable organic farms. Our platform enables recording and verification of planting details, including the variety of mangoes, planting date, and location. This information is then securely stored on the blockchain, providing an immutable record of the mangoes' origin. This enhances trust between buyers and suppliers, as the platform ensures that all operations are thoroughly inspected to meet the highest standards.`,
        gallery: [mango.src, ],
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
