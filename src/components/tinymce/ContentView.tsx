import { FC, useMemo } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import makeStyles from '@/utils/makeStyles'
import { css, SerializedStyles } from '@emotion/react'

const ContentView: FC<{ content: string }> = ({ content }) => {
  const sanitizedContent = useMemo(
    () =>
      sanitize(content, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
      }),
    [content]
  )

  const styles = useStyles({})

  const rootStyles = styles.root as SerializedStyles

  return (
    <div
      css={css(rootStyles, tinymceStyles)}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  )
}

const useStyles = makeStyles(() => ({
  root: {
    '& *': {
      margin: 'revert',
      padding: 'revert',
      outline: 'initial',
    },
  },
}))

const tinymceStyles = css`
  /*!
 * TinyMCE Skin
 *
 * Copyright (c) 2022 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 */

  line-height: 1.4;

  table {
    border-collapse: collapse;
  }
  table:not([cellpadding]) td,
  table:not([cellpadding]) th {
    padding: 0.4rem;
  }
  table[border]:not([border='0']):not([style*='border-width']) td,
  table[border]:not([border='0']):not([style*='border-width']) th {
    border-width: 1px;
  }
  table[border]:not([border='0']):not([style*='border-style']) td,
  table[border]:not([border='0']):not([style*='border-style']) th {
    border-style: solid;
  }
  table[border]:not([border='0']):not([style*='border-color']) td,
  table[border]:not([border='0']):not([style*='border-color']) th {
    border-color: #ccc;
  }
  figure {
    display: table;
    margin: 1rem auto;
  }
  figure figcaption {
    color: #999;
    display: block;
    margin-top: 0.25rem;
    text-align: center;
  }
  hr {
    border-color: #ccc;
    border-style: solid;
    border-width: 1px 0 0 0;
  }
  code {
    background-color: #e8e8e8;
    border-radius: 3px;
    padding: 0.1rem 0.2rem;
  }
  blockquote {
    border-left: 2px solid #ccc;
    margin-left: 1.5rem;
    padding-left: 1rem;
  }

  img {
    max-width: 100%;
  }
`

export default ContentView
