import sampleImg from '../assets/images/sample-img.jpg'
import certPlaceholder from '../assets/images/certification-placeholder.png'
import kiwiImg from '../assets/images/kiwi.jpg'
import typeImg from '../assets/images/grower.svg'
import cover from '../assets/images/case-study-cover.jpg'
import overviewImg from '../assets/images/case-study-img.svg'
import banner_mango from '../assets/images/banner_mango.jpg'
import apromalpi from '../assets/images/apromalpi_logo.jpg'
import mangoo1 from '../assets/images/20230111_114437.jpg'
import mangoo2 from '../assets/images/20230111_124732.jpg'
import mangop1 from '../assets/images/20230111_154101.jpg'
import mangop2 from '../assets/images/20230111_162309.jpg'
import mangoe1 from '../assets/images/20230111_163645.jpg'
import mangoe2 from '../assets/images/20230111_193734.jpg'
import globalgap from '../assets/images/global_gap.jpg'
import euorganic from '../assets/images/eu_organic.png'


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
      name: 'APROMALPI - Cooperativa Agraria de Productores Orgánicos',
      location: 'Pichanaki, Peru',
      cover: banner_mango.src,
      image: apromalpi.src,
      type: {
        title: 'Grower / Harvester',
        icon: typeImg.src,
      },
    },
    description:
      'Working in partnership with TRU MARKET, APROMALPI has shipped their mangoes to supermarket chains in The Netherlands, Belgium and Germany. APROMALPI is a well-known organic mango producer with more than 20 years of experience in organic management and export located in Chulucanas, Piura.',
    overviewImg: overviewImg.src,
    certifications: [globalgap.src, euorganic.src],
    journey: [
      {
        title: 'Harvest - milestone 1',
        description:
          'The production of organic fresh mango begins in carefully nurtured orchards located in the northern regions of Peru - at Tambogrande - in orchads where the mango trees are cultivated with utmost care and precision. From planting to harvesting, every step is crucial in ensuring the highest quality mangoes reach the consumers table. TRU MARKET innovative platform has enabled traceability in the production orchards, bringing transparency and trust to the entire journey.'+
          'Through smart contracts, TRU MARKET ensures that suppliers comply with all the milestones of the operation. This includes using certified organic farming practices, adhering to Codex Alimentarius standards for food safety, and obtaining relevant certifications such as GlobalGAP for good agricultural practices. TRU MARKET platform records and verifies each operation in real-time, creating an immutable and transparent audit trail.'+
          'With TRU MARKET technology, buyers can confidently trace the origin of the mangoes, ensuring that they are sourced from reputable organic farms. Our platform enables recording and verification of planting details, including the variety of mangoes, planting date, and location. This information is then securely stored on the blockchain, providing an immutable record of the mangoes origin. This enhances trust between buyers and suppliers, as the platform ensures that all operations are thoroughly inspected to meet the highest standards.',
        gallery: [mangoo1.src, mangoo2.src],
      },
      {
        title: 'Packing - milestone 2',
        description:
          'Once the organic fresh mangoes are harvested, they are carefully transported to the packing house where details such as washing, sorting, and packing are recorded and verified in real-time, ensuring that the mangoes are handled according to quality and safety standards.'+
          'TRU MARKET platform enables traceability in the packing house, ensuring that every mango is processed with precision.'+
          'Quality checks are conducted at every stage, ensuring that only the best mangoes are packed for shipment. Packaging standards are strictly followed, including the use of eco-friendly materials that align with organic certification requirements. TRU MARKET technology ensures that every operation is transparently recorded and verified, creating a seamless and trustworthy process.'+
          'By leveraging our platform traceability capabilities, B2B global operations of organic fresh mangoes can confidently trace the journey of mangoes from the farm to the end consumer, ensuring transparency, trust, and compliance at every step of the production process.',
        gallery: [mangop1.src, mangop2.src],
      },
      {
        title: 'Finished product - milestone 3',
        description:
        'Our platform goes beyond the B2B supply chain and extends its traceability capabilities to the finished product of organic fresh mangoes, ensuring that end consumers can have confidence in the product freshness and authenticity.'+
        'TRU MARKET enables end consumers can easily access information about the mangoes they are purchasing, such as the variety of mangoes, the farm where they were grown, and the processing methods used. This provides transparency and confidence in the mangoes quality, as consumers can verify the product claims and make informed purchasing decisions through the palm of their hand.'+
        'Furthermore, our platform ensures compliance with relevant certifications, such as organic certification and other quality and safety standards, giving consumers peace of mind knowing that they are purchasing a product that meets stringent requirements.'+
        'By leveraging our platform traceability capabilities, the finished product of organic fresh mangoes can be tracked and verified, providing end consumers with transparency, confidence, and trust in the product quality and authenticity.',
        gallery: [mangoe1.src, mangoe2.src],
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
    slug: 'ginger',
    profile: {
      name: 'RTE Amazon',
      location: 'Junin, Peru',
      cover: cover.src,
      image: apromalpi.src,
      type: {
        title: 'Grower / Processor',
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
        gallery: [mangoo1.src, ],
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
