import { useUser } from '../../hooks'
import { DetailedArticle } from '../../types'
import { Button } from '../../ui'
import dayjs from 'dayjs'
import { FC, HTMLAttributes } from 'react'
import { makeStyles } from '../../utils'
import { ContentView } from '../tinymce'

export interface ArticleViewProps extends HTMLAttributes<HTMLDivElement> {
  article: DetailedArticle
}

export const ArticleView: FC<ArticleViewProps> = (props) => {
  const styles = useStyles(props)

  const user = useUser()

  const { article, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      <div css={styles.header}>
        <h1 css={styles.heading}>{article.title}</h1>

        {user?.role === 'admin' && (
          <Button
            variant="outlined"
            fullRounded
            href={`/blog/${article._id}/update`}
          >
            Update
          </Button>
        )}
      </div>

      <p css={styles.date}>
        last update on {dayjs(article.updatedAt).format('MMM DD, YYYY')}
      </p>

      <img css={styles.thumbnail} src={article.thumbnail} alt="" />

      <ContentView content={article.content} />

      <div css={styles.keywords}>
        {article.keywords.map((keyword) => (
          <div key={keyword._id} css={styles.keyword}>
            {keyword.name}
          </div>
        ))}
      </div>
    </div>
  )
}

const useStyles = makeStyles((props: ArticleViewProps) => {
  return {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8,
      alignItems: 'center',
      gap: '8px 16px',
      flexWrap: 'wrap',
    },
    heading: {
      fontSize: 36,
      fontWeight: 400,
    },
    date: {
      fontSize: 12,
      color: 'rgb(107, 114, 128)',
      marginBottom: 32,
    },
    thumbnail: {
      width: '100%',
      height: 400,
      objectFit: 'cover',
    },
    root: {
      color: 'inherit',
      textDecoration: 'none',
    },
    imgWrapper: {
      width: '100%',
      marginBottom: 14,
      borderRadius: 16,
      overflow: 'hidden',
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    desc: {
      fontSize: 12,
      lineHeight: 1.6,
      maxHeight: 58,
      overflow: 'hidden',
    },
    keywords: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 48,
    },
    keyword: {
      fontSize: '0.75rem',
      padding: '0.5rem 0.75rem',
      backgroundColor: 'rgb(209, 213, 219)',
      borderRadius: '0.25rem',
      marginRight: '0.5rem',
      marginBottom: '0.5rem',
    },
  }
})
