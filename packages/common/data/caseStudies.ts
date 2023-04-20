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
import fairtrade from '../assets/images/fair_trade.png'
import gingero1 from '../assets/images/RECEPCION DE MATERIA PRIMA.jpg'
import gingerp1 from '../assets/images/EMPAQUE.jpg'
import gingerp2 from '../assets/images/EMPAQUE (1).jpg'
import gingere1 from '../assets/images/photo_5019684066345200851_y.jpg'
import gingere2 from '../assets/images/photo_5019684066345200815_y.jpg'
import banner_ginger from '../assets/images/ginger_banner.jpg'
import profile_ginger from '../assets/images/gingerprofile.jpg'

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
      location: 'Piura, Peru',
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
    certifications: [globalgap.src, euorganic.src, fairtrade.src],
    journey: [
      {
        title: 'Harvest - milestone 1',
        description:
          `The production of organic fresh mango begins in carefully nurtured orchards located in the northern regions of Peru - at Tambogrande - in orchads where the mango trees are cultivated with utmost care and precision. From planting to harvesting, every step is crucial in ensuring the highest quality mangoes reach the consumers table. TRU MARKET innovative platform has enabled traceability in the production orchards, bringing transparency and trust to the entire journey.
          \nThrough smart contracts, TRU MARKET ensures that suppliers comply with all the milestones of the operation. This includes using certified organic farming practices, adhering to Codex Alimentarius standards for food safety, and obtaining relevant certifications such as GlobalGAP for good agricultural practices. TRU MARKET platform records and verifies each operation in real-time, creating an immutable and transparent audit trail.
          \nWith TRU MARKET technology, buyers can confidently trace the origin of the mangoes, ensuring that they are sourced from reputable organic farms. Our platform enables recording and verification of planting details, including the variety of mangoes, planting date, and location. This information is then securely stored on the blockchain, providing an immutable record of the mangoes origin. This enhances trust between buyers and suppliers, as the platform ensures that all operations are thoroughly inspected to meet the highest standards.`,
        gallery: [mangoo1.src, mangoo2.src],
      },
      {
        title: 'Packing - milestone 2',
        description:
          `Once the organic fresh mangoes are harvested, they are carefully transported to the packing house where details such as washing, sorting, and packing are recorded and verified in real-time, ensuring that the mangoes are handled according to quality and safety standards.'
          \nTRU MARKET platform enables traceability in the packing house, ensuring that every mango is processed with precision.'
          \nQuality checks are conducted at every stage, ensuring that only the best mangoes are packed for shipment. Packaging standards are strictly followed, including the use of eco-friendly materials that align with organic certification requirements. TRU MARKET technology ensures that every operation is transparently recorded and verified, creating a seamless and trustworthy process.
          \nBy leveraging our platform traceability capabilities, B2B global operations of organic fresh mangoes can confidently trace the journey of mangoes from the farm to the end consumer, ensuring transparency, trust, and compliance at every step of the production process.`,
        gallery: [mangop1.src, mangop2.src],
      },
      {
        title: 'Finished product - milestone 3',
        description:
        `Our platform goes beyond the B2B supply chain and extends its traceability capabilities to the finished product of organic fresh mangoes, ensuring that end consumers can have confidence in the product freshness and authenticity.
        \nTRU MARKET enables end consumers can easily access information about the mangoes they are purchasing, such as the variety of mangoes, the farm where they were grown, and the processing methods used. This provides transparency and confidence in the mangoes quality, as consumers can verify the product claims and make informed purchasing decisions through the palm of their hand.
        \nFurthermore, our platform ensures compliance with relevant certifications, such as organic certification and other quality and safety standards, giving consumers peace of mind knowing that they are purchasing a product that meets stringent requirements.
        \nBy leveraging our platform traceability capabilities, the finished product of organic fresh mangoes can be tracked and verified, providing end consumers with transparency, confidence, and trust in the product quality and authenticity.`,
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
      cover: banner_ginger.src,
      image: profile_ginger.src,
      type: {
        title: 'Processor / Exporter',
        icon: typeImg.src,
      },
    },
    description:
      'Working in partnership with Catholic Relief Services, NCBA CLUSA will help establish a local Community Development Fund as part of the new $50 million Communities Leading Development Project in Guatemala funded by the U.S. Agency for International Development. Other project partners include Mercy Corps, ADIPO, Caritas Los Altos, and Caritas San Marcos.',
    overviewImg: overviewImg.src,
    certifications: [certPlaceholder.src, certPlaceholder.src],
    journey: [
        {
        title: 'Harvest - milestone 1',
        description:
          `Pichanaki, located in the heart of Peru, is known for its lush landscapes and favorable climate, making it the perfect region for cultivating organic fresh ginger. The fertile soil, ample rainfall, and abundant sunshine create optimal conditions for growing ginger with its unique flavors and characteristics.
          \nAt our production orchards in Pichanaki, we take pride in employing sustainable farming practices through growers that follow organic farming methods and comply with all the certifications.
          \nOur platform plays a crucial role in capturing and recording each step of the cultivation process in real-time, ensuring transparency and authenticity. This allows us to ensure that our ginger is sourced from reputable farmers who follow sustainable and organic practices, and it provides transparency for our customers and end consumers. With our platform, we can confidently showcase the unique characteristics of the ginger produced in Pichanaki, highlighting its superior taste, aroma, and nutritional properties, all while maintaining the highest standards of sustainability and authenticity.`,
        gallery: [gingero1.src, ],
      },
      {
        title: 'Packing - milestone 2',
        description:
          `At our packing house, we uphold the same commitment to quality and traceability as we do in the production orchards. Our platform facilitates traceability in the packing house, where the organic fresh ginger undergoes meticulous sorting, cleaning, and packaging procedures.
          \nThe ginger roots are carefully sorted to ensure that only the highest quality ginger makes it to the next stage of the process. Our experienced workers meticulously clean the ginger, removing any dirt or impurities, and ensuring that it meets our strict quality standards.
          \nOnce cleaned, the ginger is carefully packaged using precision equipment to maintain its freshness and flavor. Our packaging materials are chosen to be environmentally friendly, ensuring that our commitment to sustainability is upheld throughout the entire process. Each package is carefully labeled with relevant information, including the origin of the ginger, its organic certification, and other important details.
          \nOur technology plays a crucial role in enabling traceability in the packing house. Every step of the sorting, cleaning, and packaging process is recorded and verified using our platform. This ensures that each operation adheres to our quality standards and compliance with regulations, and provides a verifiable record of the ginger journey from the packing house to the consumers table.`,
        gallery: [gingerp1.src, gingerp2.src],
      },
      {
        title: 'Finished product - milestone 3',
        description:
          `The finished product of organic fresh ginger is the culmination of our commitment to quality, sustainability, and traceability. Our platform ensures that the final processing steps, packaging, and labeling details are recorded and verified, allowing end consumers to trace the ginger back to its source in Pichanaki, Peru, and providing them with confidence in the product quality, sustainability, and origin.
          \nOnce the ginger has undergone the sorting, cleaning, and packaging procedures at our packing house, it is ready to be delivered to consumers worldwide. Our packaging is designed to preserve the freshness and flavor of the ginger, ensuring that it arrives in the best possible condition to our customers.
          \nOur technology enables end consumers to verify the authenticity of the ginger through blockchain and food chain solutions. By scanning a QR code or accessing our online platform, consumers can access the complete traceability record of the ginger, including details about its cultivation, packing, and transportation. This empowers consumers to make informed choices, knowing that they are purchasing a premium product that is of the highest quality, sustainable, and authentic.`,
        gallery: [gingere1.src, gingere2.src],
      },
      {
        title: 'Storage - milestone 4',
        description:
          `Optimal storage conditions are crucial for preserving the freshness and flavor of organic fresh ginger, and our platform ensures traceability in the storage process.
          After the ginger is packaged, it is carefully stored in climate-controlled facilities that are designed to maintain the ginger freshness and flavor. Our platform records and verifies the storage conditions, ensuring that the ginger is stored at the optimal temperature and humidity levels to prevent deterioration and maintain its superior quality.
          Our commitment to traceability extends to every stage of the supply chain, including storage. By monitoring and recording the storage conditions, we can ensure that the ginger remains fresh and flavorful until it reaches the end consumers table. This meticulous attention to storage helps us deliver a premium product that meets our customers expectations and maintains the ginger natural goodness from Pichanaki, Peru, to consumers worldwide.`,
        gallery: [sampleImg.src, sampleImg.src],
      },
    ],
  },

]
