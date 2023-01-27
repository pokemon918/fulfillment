const getCookie = (cookies: string, cookieKey: string) => {
  if (typeof cookies !== 'string' || !(cookies.length >= 0)) return null
  if (typeof cookieKey !== 'string' || !(cookieKey.length >= 0)) return null

  let val = null

  const pairs = cookies.split(/;( )*/)
  for (const pair of pairs) {
    const eqIdx = pair.indexOf('=')

    if (!(eqIdx >= 0)) {
      continue
    }

    const curKey = pair.slice(0, eqIdx)

    if (cookieKey === curKey) {
      let curVal = pair.slice(eqIdx + 1)

      if (curVal.length > 0) {
        if (curVal.charAt(0) === '"') curVal = curVal.slice(1, -1)

        val = curVal

        break
      }
    }
  }

  return val
}

export default getCookie
