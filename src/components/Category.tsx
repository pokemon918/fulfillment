import { BaseCategory } from '@/types/category'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface CategoryProps extends HTMLAttributes<HTMLDivElement> {
  category: BaseCategory
}

const Category: FC<CategoryProps> = (props) => {
  const styles = useStyles(props)

  const { category, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      <img css={styles.img} src={category.thumbnail} alt={category.name} />
    </div>
  )
}

const useStyles = makeStyles((props: CategoryProps) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    overflow: 'hidden',
    borderRadius: 20,
  }
}))

export default Category
