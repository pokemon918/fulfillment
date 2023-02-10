import { APP_TYPE, AuthUser, getCookie, gql, graphqlReq } from 'common'
import { NextApiRequest, NextApiResponse } from 'next'

const GET_USER_ME = gql`
  {
    authUser: userProfile {
      _id
      fullName
      role
    }
  }
`

type GetUserRes = { authUser: AuthUser | null }

export default async function revalidateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = req.headers.cookie ?? ''
  const token = getCookie(cookies, `${APP_TYPE}_token`)

  const { authUser } = (await graphqlReq(
    GET_USER_ME,
    {},
    {},
    token
  )) as GetUserRes

  if (!authUser || authUser.role !== 'admin') {
    return res.status(401).json('Unauthorized')
  }

  const paths =
    typeof req.query.paths === 'string'
      ? decodeURIComponent(req.query.paths).split(',')
      : []

  try {
    for (const path of paths) {
      await res.revalidate(path)
    }

    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
