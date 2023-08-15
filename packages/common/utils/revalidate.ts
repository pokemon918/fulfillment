import { APP_TYPE } from '../constants'
import { getCookie } from './cookies'
import { uniq } from './uniq'

export const revalidatePaths = (appUrl: string, paths: string[]) => {
  const cookies = document.cookie ?? ''
  const token = getCookie(cookies, `${APP_TYPE}_token`)

  const stringifiedPaths = encodeURIComponent(paths.join(','))

  return fetch(`${appUrl}/api/revalidate?paths=${stringifiedPaths}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

interface AppPaths {
  fulfillment?: (string | undefined)[]
  investment?: (string | undefined)[]
  admin?: (string | undefined)[]
}

const appUrls = {
  fulfillment: process.env.NEXT_PUBLIC_FULFILLMENT as string,
  investment: process.env.NEXT_PUBLIC_INVESTMENT as string,
  admin: process.env.NEXT_PUBLIC_ADMIN as string,
}

export const revalidateCrossPaths = (
  appPaths: AppPaths
): { revalidate: () => Promise<void>; paths: string[] } => {
  const appKeys = Object.keys(appPaths) as (keyof AppPaths)[]

  const processedAppPaths: {
    [appKey: string]: string[]
  } = {}

  appKeys.map((appKey) => {
    const paths = appPaths[appKey]

    if (paths) {
      const appUrl = appUrls[appKey]

      const filteredPaths = uniq(
        paths.filter((path) => typeof path !== 'undefined') as string[]
      )

      processedAppPaths[appUrl] = filteredPaths
    }
  })

  return {
    revalidate: async () => {
      await Promise.all(
        Object.entries(processedAppPaths).map(([appUrl, paths]) =>
          revalidatePaths(appUrl, paths)
        )
      )
    },
    paths: Object.values(processedAppPaths).reduce(
      (acc, cur) => [...acc, ...cur],
      []
    ),
  }
}
