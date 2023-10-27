import * as Filestack from 'filestack-js'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const parts: QueryResolvers['parts'] = () => {
  return db.part.findMany()
}

export const part: QueryResolvers['part'] = ({ id }) => {
  return db.part.findUnique({
    where: { id },
  })
}

export const createPart: MutationResolvers['createPart'] = ({ input }) => {
  return db.part.create({
    data: input,
  })
}

export const updatePart: MutationResolvers['updatePart'] = ({ id, input }) => {
  return db.part.update({
    data: input,
    where: { id },
  })
}

export const deletePart: MutationResolvers['deletePart'] = async ({ id }) => {
  const client = Filestack.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)
  const part = await db.part.findUnique({ where: { id } })
  const handle = part.imageUrl.split('/').pop()

  const security = Filestack.getSecurity(
    {
      expiry: new Date().getTime() + 5 * 60 * 1000,
      handle,
      call: ['remove'],
    },
    process.env.REDWOOD_ENV_FILESTACK_SECRET
  )

  await client.remove(handle, security)

  return db.part.delete({
    where: { id },
  })
}
