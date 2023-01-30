import { BaseCategory } from '@/types/category'
import Container from '@/ui/Container'
import ContainerWide from '@/ui/ContainerWide'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'
import Categories from './Categories'

interface CategoriesOverviewProps extends HTMLAttributes<HTMLDivElement> {
  categories: BaseCategory[]
}

const CategoriesOverview: FC<CategoriesOverviewProps> = (props) => {
  const styles = useStyles(props)

  const { categories, ...divProps } = props

  return (
    <div css={styles.wrapper} {...divProps}>
      <div css={styles.root}>
        <h4 css={styles.heading} style={{ marginBottom: 34 }}>
          Categories
        </h4>

        <ContainerWide
          scrollable
          endBlur="linear-gradient(269.92deg, #FFFFFF 0.05%, rgba(255, 255, 255, 0) 99.9%)"
        >
          <Categories categories={categories} />
        </ContainerWide>
      </div>
    </div>
  )
}

const useStyles = makeStyles((props: CategoriesOverviewProps) => ({
  wrapper: {
    position: 'relative',
    background: 'rgba(176, 217, 80, 0.3)',
    // '::before': {
    //   content: "''",
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   width: '93%',
    //   height: 373,

    //   zIndex: -1
    // }
  },
  root: {
    position: 'relative',
    paddingTop: 74,
    paddingBottom: 74,
  },
  heading: {
    fontWeight: 700,
    fontSize: 36,
    lineHeight: 1.25,
    textAlign: 'center',
    color: '#69832C',
    marginBottom: 44,
  },
}))

export default CategoriesOverview
