import { uniq } from './uniq'

export const revalidate = (appUrl: string, paths: string[]) => {
  const stringifiedPaths = encodeURIComponent(paths.join(','))
  return fetch(`/api/revalidate?paths=${stringifiedPaths}`)
}

interface AppPaths {
  fulfillment?: (string | undefined)[]
  investment?: (string | undefined)[]
}

const appUrls = {
  fulfillment: process.env.NEXT_PUBLIC_FULFILLMENT as string,
  investment: process.env.NEXT_PUBLIC_INVESTMENT as string,
}

export const revalidateCrossPaths = (
  appPaths: AppPaths
): { revalidatePromise: Promise<any>; paths: string[] } => {
  const appKeys = Object.keys(appPaths) as (keyof AppPaths)[]

  const revalidatingPaths: string[] = []
  const promises: Promise<any>[] = []

  appKeys.map((appKey) => {
    const paths = appPaths[appKey]

    if (paths) {
      const appUrl = appUrls[appKey]

      const filteredPaths = uniq(
        paths.filter((path) => typeof path !== 'undefined') as string[]
      )

      revalidatingPaths.push(...filteredPaths)
      promises.push(revalidate(appUrl, filteredPaths))
    }
  })

  return {
    revalidatePromise: Promise.all(promises),
    paths: revalidatingPaths,
  }
}
