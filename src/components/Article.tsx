import { BaseArticle } from '@/types/article'
import makeStyles from '@/utils/makeStyles'
import mergeProps from '@/utils/mergeProps'
import { FC, HTMLAttributes } from 'react'

export interface ArticleProps extends HTMLAttributes<HTMLDivElement> {
  article: BaseArticle
}

const Article: FC<ArticleProps> = (props) => {
  const styles = useStyles(props)

  const { article, ...divProps } = props

  return (
    <div css={styles.root} {...divProps} onClick={() => alert('Hi')}>
      <img src={article.thumbnail} css={styles.img} />

      <h3 css={styles.heading}>{article.title}</h3>

      <p css={styles.desc}>
        {article.description}
      </p>
    </div>
  )
}

const useStyles = makeStyles((props: ArticleProps) => {
  return {
    root: {
      cursor: 'pointer'
    },
    img: {
      width: '100%',
      height: 372,
      objectFit: 'cover',
      marginBottom: 14,
      borderRadius: 16,
    },
    heading: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 5
    },
    desc: {
      fontSize: 12,
      lineHeight: 1.6,
      maxHeight: 58,
      overflow: 'hidden'
    },
  }
})

export default Article
