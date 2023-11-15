import * as Filestack from 'filestack-js'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

const PARTS_PER_PAGE = 8

const removeEnding = (input: string): string =>
  input.endsWith('ending') ? input.slice(0, -6) : input

export const parts: QueryResolvers['parts'] = () => {
  return db.part.findMany()
}

export const part: QueryResolvers['part'] = ({ id }) => {
  return db.part.findUnique({
    where: { id },
  })
}

export const partPage: QueryResolvers['partPage'] = async ({
  page = 1,
  sort = 'id',
  order = 'ascending',
  searchQuery,
}) => {
  const offset = (page - 1) * PARTS_PER_PAGE
  let orderByCase

  switch (sort) {
    case 'id':
      orderByCase = { id: removeEnding(order) }
      break

    case 'name':
      orderByCase = { name: removeEnding(order) }
      break

    case 'createdAt':
      orderByCase = { createdAt: removeEnding(order) }
      break

    case 'description':
      orderByCase = { description: removeEnding(order) }
      break

    case 'stock':
      orderByCase = {
        availableStock: removeEnding(order),
      }
      break

    default:
      orderByCase = { id: removeEnding(order) }
      break
  }

  if (searchQuery && searchQuery.length > 0)
    return {
      parts: await db.part.findMany({
        where: {
          name: {
            contains: searchQuery,
          },
        },
        take: PARTS_PER_PAGE,
        skip: offset,
        orderBy: orderByCase,
      }),
      count: await db.part.count({
        where: {
          name: {
            contains: searchQuery,
          },
        },
      }),
      page,
      sort,
      order,
      search: searchQuery,
    }
  else
    return {
      parts: await db.part.findMany({
        take: PARTS_PER_PAGE,
        skip: offset,
        orderBy: orderByCase,
      }),
      count: await db.part.count(),
      page,
      sort,
      order,
    }
}

export const createPart: MutationResolvers['createPart'] = ({ input }) => {
  input.description =
    input.description.length == 0
      ? 'No description provided'
      : input.description

  return db.part.create({
    data: input,
  })
}

export const updatePart: MutationResolvers['updatePart'] = ({ id, input }) => {
  input.description =
    input.description.length == 0
      ? 'No description provided'
      : input.description

  return db.part.update({
    data: input,
    where: { id },
  })
}

export const deletePart: MutationResolvers['deletePart'] = async ({ id }) => {
  const client = Filestack.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)
  const part = await db.part.findUnique({ where: { id } })

  if (!part.imageUrl.includes('no_image.png')) {
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
  }

  return db.part.delete({
    where: { id },
  })
}
