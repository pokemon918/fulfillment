import { BaseCategory } from '@/types/category'
import BoxRation from '@/ui/BoxRatio'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface CategoryProps extends HTMLAttributes<HTMLDivElement> {
  category: BaseCategory
}

const Category: FC<CategoryProps> = (props) => {
  const styles = useStyles(props)

  const { category, ...divProps } = props

  return (
    <BoxRation ration={1.18} css={styles.root} {...divProps}>
      <img css={styles.img} src={category.thumbnail} alt={category.name} />
    </BoxRation>
  )
}

const useStyles = makeStyles((props: CategoryProps) => ({
  root: {
    display: 'flex',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
}))

export default Category
