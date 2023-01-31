import { BaseCategory } from '@/types/category'
import ContainerWide from '@/ui/ContainerWide'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'
import Category from './Category'

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
          endBlur="linear-gradient(269.92deg, #e7f4ca 0.05%, rgba(231, 244, 202, 0) 99.9%)"
        >
          <div css={styles.categories}>
            {categories.map((category) => (
              <Category
                css={styles.category}
                key={category._id}
                category={category}
              />
            ))}

            <div css={styles.emptyBox} />
          </div>
        </ContainerWide>
      </div>
    </div>
  )
}

const useStyles = makeStyles((props: CategoriesOverviewProps) => {
  const box = {
    width: 265,
    flexShrink: 0,
    '@media (max-width: 360px)': {
      width: 'calc(100% - 64px)',
    },
  }

  return {
    wrapper: {
      position: 'relative',
      background: 'rgba(176, 217, 80, 0.3)',
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
    categories: {
      height: 'auto',
      display: 'flex',
      padding: '0 16px',
    },
    category: {
      marginRight: 36,
      ...box,
    },
    emptyBox: {
      flexShrink: 0,
      width: 16,
    },
  }
})

export default CategoriesOverview
