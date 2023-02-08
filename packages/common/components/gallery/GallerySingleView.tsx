import { FC, useEffect, useRef } from 'react'
import { Container, IconButton } from '../../ui'
import { CloseIcon, ArrowBackIcon, ForwardIcon } from '../../icons'
import { makeStyles } from '../../utils'
import { theme } from '../../theme'

interface GallerySingleViewProps {
  open: boolean
  viewingIdx: number
  images: string[]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export const GallerySingleView: FC<GallerySingleViewProps> = (props) => {
  const { open, viewingIdx, images, onClose, onPrev, onNext } = props

  const styles = useStyles(props)

  const lastViewingIdx = useRef(viewingIdx)

  useEffect(() => {
    if (viewingIdx > -1) lastViewingIdx.current = viewingIdx
  }, [viewingIdx])

  const backBtn = (
    <IconButton css={styles.arrowBtn} onClick={onPrev}>
      <ArrowBackIcon />
    </IconButton>
  )

  const nextBtn = (
    <IconButton css={styles.arrowBtn} onClick={onNext}>
      <ForwardIcon />
    </IconButton>
  )

  return (
    <div css={styles.root} data-open={open}>
      <div css={styles.header}>
        <Container maxWidth="lg" style={{ paddingLeft: 8 }}>
          <IconButton css={{ color: 'inherit' }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Container>
      </div>

      <div css={styles.body}>
        <div css={styles.deskArrowBtnWrapper}>{viewingIdx > 0 && backBtn}</div>

        <div css={styles.imgView}>
          {images.map((image, idx) => (
            <div
              key={idx}
              css={styles.imgWrapper}
              data-open={idx === viewingIdx ? true : undefined}
            >
              <img css={styles.img} src={image} alt="" />
            </div>
          ))}
        </div>

        <div css={styles.deskArrowBtnWrapper}>
          {viewingIdx + 1 < images.length && nextBtn}
        </div>
      </div>

      <div css={styles.footer}>
        <div css={styles.mobileArrows}>
          {backBtn}
          {nextBtn}
        </div>
        {viewingIdx + 1} / {images.length}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: GallerySingleViewProps) => {
  const deskFooterHeight = 66
  const mobileFooterHeight = deskFooterHeight + 48
  const imgYPadding = 16
  const dImageYSpaces = deskFooterHeight * 2 + imgYPadding * 2
  const mImageYSpaces = mobileFooterHeight * 2 + imgYPadding * 2

  return {
    root: {
      position: 'fixed',
      bottom: '-100%',
      left: 0,
      width: '100%',
      height: '100%',
      background: '#000',
      color: '#eee',
      zIndex: 801,
      opacity: 0,
      transition: 'bottom 0.3s, opacity 0.3s, visibility 0.3s',
      visibility: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      '&[data-open="true"]': {
        visibility: 'visible',
        opacity: 1,
        bottom: 0,
      },
    },
    header: {
      paddingTop: 16,
      flexShrink: 0,
      height: deskFooterHeight,
      [`@media (max-width: ${theme.widths.tabletXs})`]: {
        height: mobileFooterHeight,
      },
    },
    body: {
      height: 'auto',
      flexGrow: 1,
      width: '100%',
      display: 'flex',
      padding: '0 16px',
      maxWidth: 'var(--container-width-lg)',
      margin: '0 auto',
      alignItems: 'center',
    },
    deskArrowBtnWrapper: {
      width: 40,
      flexShrink: 0,
      [`@media (max-width: ${theme.widths.tabletXs})`]: {
        display: 'none',
      },
    },
    arrowBtn: {
      color: 'inherit',
      border: '1px solid #eee',
      display: 'inline-flex',
      borderRadius: '50%',
    },
    imgView: {
      flexGrow: 1,
      padding: '0 16px',
      [`@media (max-width: ${theme.widths.tabletXs})`]: {
        padding: 0,
      },
    },
    imgWrapper: {
      width: '100%',
      display: 'none',
      '&[data-open="true"]': {
        display: 'block',
      },
    },
    img: {
      display: 'block',
      maxWidth: '100%',
      margin: '0 auto',
      maxHeight: `calc(100vh - ${dImageYSpaces}px)`,
      userSelect: 'none',
      objectFit: 'cover',
      [`@media (max-width: ${theme.widths.tabletXs})`]: {
        maxHeight: `calc(100vh - ${mImageYSpaces}px)`,
      },
    },
    mobileArrows: {
      display: 'none',
      marginBottom: 24,
      '> button:not(:last-of-type)': {
        marginRight: 64,
      },
      [`@media (max-width: ${theme.widths.tabletXs})`]: {
        display: 'block',
      },
    },
    footer: {
      textAlign: 'center',
      height: deskFooterHeight,
      flexShrink: 0,
      [`@media (max-width: ${theme.widths.tabletXs})`]: {
        height: mobileFooterHeight,
      },
    },
  }
})
