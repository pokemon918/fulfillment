import { CSSProperties, FC, HTMLAttributes, useRef, useState } from 'react'
import { useForceUpdate } from '../hooks'
import { useRefState } from '../hooks/useRefState'
import { PlayIcon } from '../icons'
import { makeStyles } from '../utils'

interface RoundedVideoProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: CSSProperties
  src?: string
}

export const RoundedVideo: FC<RoundedVideoProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useRefState(false)

  const styles = useStyles(props)

  const { className, style, src } = props

  const handleClick = () => {
    const video = videoRef.current!

    if (isPlaying.current) {
      video.pause()
    } else {
      video.play()
    }
  }

  return (
    <div
      css={styles.root}
      className={className}
      style={style}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        css={styles.video}
        playsInline
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {!isPlaying.current && (
        <div css={styles.playIndicator}>
          <PlayIcon style={{ color: '#fff', fontSize: 48 }} />
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles((props: RoundedVideoProps) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  playIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 75,
    height: 75,
    borderRadius: '50%',
    background: 'rgba(176, 217, 80, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
