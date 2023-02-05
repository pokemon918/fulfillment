import { BaseArticle } from '@/types/article'
import BoxRation from '@/ui/BoxRatio'
import makeStyles from '@/utils/makeStyles'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

export interface ArticleProps extends HTMLAttributes<HTMLAnchorElement> {
  article: BaseArticle
}

const Article: FC<ArticleProps> = (props) => {
  const styles = useStyles(props)

  const { article, ...anchorProps } = props

  return (
    <Link href={`/blog/${article._id}`} css={styles.root} {...anchorProps}>
      <BoxRation
        css={styles.imgBg}
        ration={1.2}
        style={{ backgroundImage: `url(${article.thumbnail})` }}
      />

      <h3 css={styles.heading}>{article.title}</h3>

      <p css={styles.desc}>{article.description}</p>
    </Link>
  )
}

const useStyles = makeStyles((props: ArticleProps) => {
  return {
    root: {
      cursor: 'pointer',
      color: 'inherit',
      textDecoration: 'none',
    },
    imgBg: {
      width: '100%',
      marginBottom: 14,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    heading: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 5,
    },
    desc: {
      fontSize: 12,
      lineHeight: 1.6,
      maxHeight: 58,
      overflow: 'hidden',
    },
  }
})

export default Article
