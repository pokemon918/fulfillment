import ArrowLeft from '@/icons/ArrowLeft'
import ArrowRight from '@/icons/ArrowRight'
import { BaseArticle } from '@/types/article'
import Button from '@/ui/Button'
import makeStyles from '@/utils/makeStyles'
import mergeProps from '@/utils/mergeProps'
import { FC, HTMLAttributes } from 'react'
import Article from './Article'

export interface BlogOverviewProps extends HTMLAttributes<HTMLDivElement> {
  articles: BaseArticle[]
}

const BlogOverview: FC<BlogOverviewProps> = (props) => {
  const styles = useStyles(props)

  const { articles, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      <div css={styles.mainView}>
        <div>
          <h3 css={styles.heading}>Blog</h3>

          <p css={styles.desc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus,
            fermentum amet faucibus sed id nisi lectus at.
          </p>

          <Button style={{ minWidth: 205 }}>See More</Button>
        </div>

        <div>
          <button css={styles.swapBtn}>
            <ArrowLeft />
          </button>

          <button css={styles.swapBtn}>
            <ArrowRight />
          </button>
        </div>
      </div>

      <div css={styles.articlesView}>
        <div css={styles.articles}>
          {articles.map((article) => (
            <Article key={article._id} css={styles.article} article={article} />
          ))}
        </div>

        <div css={styles.shadow}></div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((props: BlogOverviewProps) => {
  return {
    root: {
      display: 'grid',
      gridTemplateColumns: '355px 1fr',
      gap: 50,
    },
    heading: {
      fontWeight: 700,
      fontSize: 36,
      lineHeight: 1.25,
      color: '#69832C',
      marginBottom: 16,
    },
    mainView: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    desc: {
      fontSize: 18,
      marginBottom: 40,
    },
    articlesView: {
      position: 'relative',
      width: '100%',
      height: 'auto',
      display: 'grid',
      gridTemplateColumns: '100%',
    },
    articles: {
      position: 'relative',
      display: 'flex',
      overflow: 'auto',
      width: '100%',
      scrollbarWidth: 'none',
      '::-webkit-scrollbar': {
        display: 'none',
      },
    },
    article: {
      flexShrink: 0,
      width: 310,
      '&:not(:last-of-type)': {
        marginRight: 30,
      },
    },
    shadow: {
      position: 'absolute',
      height: '100%',
      width: 224,
      top: 0,
      right: 0,
      background:
        'linear-gradient(269.92deg, #FFFFFF 0.05%, rgba(255, 255, 255, 0) 99.9%)',
      pointerEvents: 'none',
    },
    swapBtn: {
      border: '2px solid #000000',
      height: 42,
      width: 42,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      background: 'transparent',
      '&:not(:last-of-type)': {
        marginRight: 16
      }
    },
  }
})

export default BlogOverview
