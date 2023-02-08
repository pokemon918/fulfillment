import { BaseCategory } from '@/types/category'
import BoxRation from '@/ui/BoxRatio'
import makeStyles from '@/utils/makeStyles'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

interface CategoryProps extends HTMLAttributes<HTMLAnchorElement> {
  category: BaseCategory
}

const Category: FC<CategoryProps> = (props) => {
  const styles = useStyles(props)

  const { category, ...anchorProps } = props

  return (
    <Link
      css={styles.root}
      href={`/categories/${category._id}/products`}
      {...anchorProps}
    >
      <BoxRation ration={1.18} css={styles.box} style={{ backgroundImage: `url(${category.thumbnail})` }}>
        <div css={styles.cover} data-cover="true"></div>

        <div css={styles.coverText} data-cover-text="true">
          {category.name}
        </div>
      </BoxRation>
    </Link>
  )
}

const useStyles = makeStyles((props: CategoryProps) => ({
  root: {
    color: 'inherit',
    textDecoration: 'none',
    width: '100%',
  },
  box: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    ':hover': {
      '& [data-cover="true"]': {
        opacity: '0.6',
      },
      '& [data-cover-text="true"]': {
        display: 'flex',
      },
    },
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
    textAlign: 'center',
  },
}))

export default Category
