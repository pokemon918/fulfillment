import { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'
import { BaseArticle } from '../types'
import { Button, ScrollView } from '../ui'
import { makeStyles } from '../utils'
import { Article } from './Article'

export interface BlogOverviewProps extends HTMLAttributes<HTMLDivElement> {
  articles: BaseArticle[]
}

export const BlogOverview: FC<BlogOverviewProps> = (props) => {
  const styles = useStyles(props)

  const { articles, ...divProps } = props
  return (
    <div css={styles.root} {...divProps}>
      <ScrollView
        maxWidth="md"
        endBlur="linear-gradient(269.92deg, #FFFFFF 0.05%, rgba(255, 255, 255, 0) 99.9%);"
        children={
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
        }
        render={({ deskArrows, mobileArrows, scrollView }) => (
          <>
            <div css={styles.view}>
              <div css={styles.mainView}>
                <h3 css={styles.heading}>Market Intelligence Update</h3>
                <p css={styles.desc}>
                  Our blog is dedicated to exploring
                  the fascinating and ever-evolving
                  industry of fresh produce. Here, we
                  delve into the art of cultivating,
                  harvesting, and distributing these
                  colorful treasures of nature.
                </p>
                <Button
                  href="/blog"
                  css={styles.deskBtn}
                  style={{ minWidth: 205 }}
                >
                  See More
                </Button>
                {deskArrows}
              </div>
              {scrollView}
            </div>
            {mobileArrows}
          </>
        )}
      />
      <div css={styles.mobileFooter}>
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
      padding: '0 0 0 96px',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        gridTemplateColumns: 'minmax(0, 1fr)',
        gap: 40,
        padding: '0 16px',
      },
    },
    heading: {
      fontWeight: 600,
      fontSize: 48,
      color: '#3BA83B',
      marginBottom: 16,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        fontSize: 38,
      },
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        fontSize: 32,
      },
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
      fontWeight: 500,
      marginBottom: 20,
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
      marginRight: 30,
      [`@media (max-width: ${theme.widths.mobileSm})`]: {
        width: 'calc(100% - 56px)',
      },
    },
    emptyArticle: {
      width: 16,
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
