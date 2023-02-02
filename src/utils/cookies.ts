const domain = (() => {
  let val = process.env.NEXT_PUBLIC_MAIN_DOMAIN
  if (val !== 'localhost') val = '.' + val
  return val
})()

// getCookie
export const getCookie = (cookies: string, cookieKey: string) => {
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

// setCookie
export const setCookie = (name: string, value: string, expiresAt: Date) => {
  let cookie = `${name}=${value};domain=${domain};path=/;expires=${expiresAt.toUTCString()}`
  if (domain !== 'localhost') cookie += `;secure`
  cookie += ';'
  document.cookie = cookie
}

// deleteCookie
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;domain=${domain};path=/;expires=${'Thu, 01 Jan 1970 00:00:00 GMT'};`
}
