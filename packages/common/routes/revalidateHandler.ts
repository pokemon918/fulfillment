import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import { AuthUser } from '../types'
import { getCookie, graphqlReq, runMiddleware } from '../utils'
import Cors from 'cors'

const fulfillment = process.env.NEXT_PUBLIC_FULFILLMENT as string
const investment = process.env.NEXT_PUBLIC_INVESTMENT as string
const admin = process.env.NEXT_PUBLIC_ADMIN as string

const cors = Cors({
  origin: [fulfillment, investment, admin],
  methods: ['POST', 'GET', 'HEAD'],
})

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

export async function revalidateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors)

  const { authUser } = (await graphqlReq(
    GET_USER_ME,
    {},
    {
      authorization: req.headers.authorization ?? '',
    }
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
