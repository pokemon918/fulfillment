import { DetailedProduct } from '@/types/product'
import Button from '@/ui/Button'
import Steps from '@/ui/steps/Steps'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, useState } from 'react'
import Gallery from '../Gallery'

interface ProductInfoProps extends HTMLAttributes<HTMLDivElement> {
  product: DetailedProduct
}

const traceTitles = {
  field: 'Field',
  packing: 'Packing',
  finalProduct: 'Final Product',
}

const steps: {
  title: string
  description: string
  gallery: string[]
}[] = [
  {
    title: 'Plantation',
    description:
      'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: ['/images/grape.png'],
  },
  {
    title: 'Plantation',
    description:
      'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: ['/images/grape.png', '/images/grape.png'],
  },
  {
    title: 'Plantation',
    description:
      'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: ['/images/grape.png'],
  },
  {
    title: 'Plantation',
    description:
      'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
    gallery: ['/images/grape.png', '/images/grape.png'],
  },
]

const ProductInfo: FC<ProductInfoProps> = (props) => {
  const [view, setView] = useState<'details' | 'gallery'>('details')
  const styles = useStyles(props)

  const { product, ...divProps } = props

  console.log(
    product.traces.map((trace) => ({
      ...trace,
      title: 'Plantation',
    }))
  )

  return (
    <div css={styles.root} {...divProps}>
      <div css={styles.toggleNav}>
      <div css={styles.toggleButtons}>
        <Button
          css={styles.toggleBtn}
          data-inactive={view !== 'details'}
          onClick={() => setView('details')}
        >
          Product Details
        </Button>

        <Button
          css={styles.toggleBtn}
          data-inactive={view !== 'gallery'}
          onClick={() => setView('gallery')}
        >
          Gallery
        </Button>
      </div>
      </div>
      

      <Gallery
        style={{ display: view === 'gallery' ? undefined : 'none' }}
        gallery={product.gallery}
      />

      <div style={{ display: view === 'details' ? undefined : 'none' }}>
        <h2 css={styles.heading}>Our Process from Farm to Buyer</h2>
        <Steps
          steps={[
            ...product.traces.map((trace) => ({
              ...trace,
              title: traceTitles[trace.type as keyof typeof traceTitles],
            })),
            {
              title: 'Plantation',
              description: 'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
              gallery: ['/images/grape.png', '/images/grape.png'],
            },
          ]}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: ProductInfoProps) => ({
  root: {},
  heading: {
    fontSize: 30,
    fontWeight: 700,
    textAlign: 'center',
    color: '#B1DA50',
    marginBottom: 56,
  },
  toggleNav: {
    width: '100%',
    marginBottom: 56
  },
  toggleButtons: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginRight: -20,
    marginBottom: -12,
  },
  toggleBtn: {
    padding: '10px 20px',
    minWidth: 'inherit',
    marginRight: 20,
    marginBottom: 12,
    '&[data-inactive="true"]': {
      background: '#fff',
      color: '#434343',
    },
  },
}))

export default ProductInfo
