import ArrowLeft from '@/icons/ArrowLeft'
import ArrowRight from '@/icons/ArrowRight'
import theme from '@/theme'
import { BaseArticle } from '@/types/article'
import Button from '@/ui/Button'
import ContainerWide from '@/ui/ContainerWide'
import makeStyles from '@/utils/makeStyles'
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
      <div css={styles.view}>
        <div css={styles.mainView}>
          <div>
            <h3 css={styles.heading}>Blog</h3>

            <p css={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus,
              fermentum amet faucibus sed id nisi lectus at.
            </p>

            <Button href="/blog" css={styles.deskBtn} style={{ minWidth: 205 }}>
              See More
            </Button>
          </div>

          <div css={styles.deskNavigators}>
            <button css={styles.swapBtn}>
              <ArrowLeft />
            </button>

            <button css={styles.swapBtn}>
              <ArrowRight />
            </button>
          </div>
        </div>

        <ContainerWide
          scrollable
          maxWidth="none"
          endBlur="linear-gradient(269.92deg, #FFFFFF 0.05%, rgba(255, 255, 255, 0) 99.9%);"
          contentEndWidth={54}
        >
          <div css={styles.articles}>
            {articles.map((article) => (
              <Article
                key={article._id}
                css={styles.article}
                article={article}
              />
            ))}

            <div css={styles.emptyArticle} />
          </div>
        </ContainerWide>
      </div>

      <div css={styles.mobileFooter}>
        <div css={styles.mobileNavigators}>
          <button css={styles.swapBtn}>
            <ArrowLeft />
          </button>

          <button css={styles.swapBtn}>
            <ArrowRight />
          </button>
        </div>
        <Button href="/blog" style={{ minWidth: 205 }}>
          See More
        </Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles((props: BlogOverviewProps) => {
  return {
    root: {},
    view: {
      display: 'grid',
      gridTemplateColumns: '355px minmax(0, 1fr)',
      gap: 50,
      paddingLeft: 16,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        gridTemplateColumns: 'minmax(0, 1fr)',
        gap: 40,
      },
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
      justifyContent: 'space-between',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        maxWidth: 600,
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        paddingRight: 16,
      },
    },
    deskBtn: {
      [`@media (max-width: ${theme.widths.tablet})`]: {
        display: 'none',
      },
    },
    deskNavigators: {
      [`@media (max-width: ${theme.widths.tablet})`]: {
        display: 'none',
      },
    },
    desc: {
      fontSize: 18,
      marginBottom: 40,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        marginBottom: 0,
        fontSize: 16,
      },
    },
    articlesView: {
      width: '100%',
      background: 'red',
    },
    articles: {
      height: 'auto',
      display: 'flex',
    },
    article: {
      flexShrink: 0,
      width: 310,
      '&:not(:last-of-type)': {
        marginRight: 30,
      },
      [`@media (max-width: ${theme.widths.mobileSm})`]: {
        width: 'calc(100% - 56px)',
      },
    },
    emptyArticle: {
      width: 24,
      flexShrink: 0,
    },
    mobileFooter: {
      display: 'none',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
      },
    },
    mobileNavigators: {
      marginBottom: 16,
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
        marginRight: 16,
        [`@media (max-width: ${theme.widths.tablet})`]: {
          marginRight: 20,
        },
      },
    },
  }
})

export default BlogOverview
