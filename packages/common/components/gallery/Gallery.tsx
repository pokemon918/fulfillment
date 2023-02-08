import { makeStyles } from '../../utils'
import { FC, HTMLAttributes, useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'
import { theme } from '../../theme'
import { NoSSR } from '../NoSSR'

interface GalleryProps extends HTMLAttributes<HTMLDivElement> {
  gallery: string[]
}

export const Gallery: FC<GalleryProps> = (props) => {
  const styles = useStyles(props)

  const { gallery, ...divProps } = props

  const isTablet = useMediaQuery({
    query: `(max-width: ${theme.widths.tablet})`,
  })

  const isTabletXs = useMediaQuery({
    query: `(max-width: ${theme.widths.tabletXs})`,
  })

  const isDesktop = !isTablet && !isTabletXs

  const rows = useMemo(() => {
    const result: string[][] = []

    if (isDesktop) {
      result.push([], [], [])
      gallery.map((img, imgIdx) => result[imgIdx % 3].push(img))
    } else if (isTablet) {
      result.push([], [])
      gallery.map((img, imgIdx) => result[imgIdx % 2].push(img))
    } else {
      result.push(gallery)
    }

    return result
  }, [gallery, isDesktop, isTablet, isTabletXs])

  return (
    <NoSSR>
      <div css={styles.root} {...divProps}>
        {rows.map((row, rowIdx) => (
          <div css={styles.column} key={rowIdx}>
            {rows[rowIdx].map((img, imgIdx) => (
              <img
                key={'' + rowIdx + imgIdx}
                css={styles.img}
                src={img}
                alt=""
              />
            ))}
          </div>
        ))}
      </div>
    </NoSSR>
  )
}

const useStyles = makeStyles(({}: GalleryProps) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 20,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [`@media (max-width: ${theme.widths.tabletXs})`]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    width: '100%',
    '&:not(:last-of-type)': {
      marginBottom: 20,
    },
  },
}))
