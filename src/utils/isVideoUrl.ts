const VIDEO_REGEX = /\.(3gp|3g2|avi|mp4|mpeg|mpeg|ogv|webm)$/

const isVideoUrl = (url: string) => VIDEO_REGEX.test(url.trim())

export default isVideoUrl
