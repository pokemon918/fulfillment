import { BaseCategory } from '@/types/category'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'
import Category from './Category'

interface CategoriesProps extends HTMLAttributes<HTMLDivElement> {
  categories: BaseCategory[]
}

const Categories: FC<CategoriesProps> = (props) => {
  const styles = useStyles(props)

  const { categories, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      {categories.map((category) => (
        <Category
          css={styles.category}
          key={category._id}
          category={category}
        />
      ))}

      <div css={styles.emptyBox} />
    </div>
  )
}

const useStyles = makeStyles((props: CategoriesProps) => {
  const box = {
    width: 265,
    height: 314,
    flexShrink: 0,   
  }

  return {
    root: {
      height: 'auto',
      display: 'flex',
      
    },
    category: { 
      marginRight: 36,
      ...box
    },
    emptyBox: {
      ...box
    }
  }
})

export default Categories
