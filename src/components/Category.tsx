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

      <div css={styles.cover} data-cover="true"></div>

      <div css={styles.coverText} data-cover-text="true">{category.name}</div>
    </BoxRation>
  )
}

const useStyles = makeStyles((props: CategoryProps) => ({
  root: {
    display: 'flex',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    cursor: 'pointer',
    ':hover': {
      '& [data-cover="true"]': {
        opacity: '0.6',
      },
      '& [data-cover-text="true"]': {
        display: 'flex'
      },
    },
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: '0',
    background: '#000',
    transition: 'opacity 0.25s',
  },
  coverText: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    fontSize: 25,
    color: '#fff',
    padding: 16,
    
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
}))

export default Category
