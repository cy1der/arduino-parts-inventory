import type {
  QueryResolvers,
  MutationResolvers,
  TransactionRelationResolvers,
  Part,
} from 'types/graphql'

import { UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const transactions: QueryResolvers['transactions'] = async ({
  filter,
}) => {
  const transactions =
    filter == 'both'
      ? await db.transaction.findMany({
          orderBy: {
            date: 'desc',
          },
        })
      : await db.transaction.findMany({
          where: {
            type: filter,
          },
          orderBy: {
            date: 'desc',
          },
        })

  return {
    transactions,
    filter,
  }
}

export const userTransactions: QueryResolvers['userTransactions'] = async ({
  userId,
  filter,
}) => {
  return {
    transactions:
      filter == 'both'
        ? await db.transaction.findMany({
            where: {
              userId,
            },
            orderBy: {
              date: 'desc',
            },
          })
        : await db.transaction.findMany({
            where: {
              AND: {
                userId,
                type: filter,
              },
            },
            orderBy: {
              date: 'desc',
            },
          }),
    filter,
  }
}

export const transaction: QueryResolvers['transaction'] = ({ id }) => {
  return db.transaction.findUnique({
    where: { id },
  })
}

export const returnTransaction: MutationResolvers['returnTransaction'] =
  async ({ id, userId }) => {
    const transaction = await db.transaction.findUnique({ where: { id } })

    if (transaction.type == 'out' && userId == transaction.userId) {
      for (const partRaw of transaction.parts) {
        const transactionPart = JSON.parse(partRaw['part']) as Part
        const part = await db.part.findUnique({
          where: { id: transactionPart.id },
        })

        await db.part.update({
          where: { id: part.id },
          data: {
            availableStock: {
              increment: partRaw['quantity'],
            },
          },
        })
      }

      return await db.transaction.update({
        where: { id: transaction.id },
        data: { type: 'in' },
      })
    } else return transaction
  }

export const createTransaction: MutationResolvers['createTransaction'] =
  async ({ input }) => {
    const basket = input.parts.map((item) => {
      const part: Part = JSON.parse(item['part']) as Part
      return { part: part.id, quantity: item['quantity'] }
    })

    for (const item of basket) {
      const part = await db.part.findUnique({ where: { id: item.part } })

      if (!part) throw new UserInputError(`Part ${item.part} does not exist`)

      if (input.type == 'out') {
        if (part.availableStock < item.quantity)
          throw new UserInputError(
            `Cannot take out more than available stock (${part.availableStock} available, ${item.quantity} requested)`
          )

        await db.part.update({
          where: { id: item.part },
          data: { availableStock: { decrement: item.quantity } },
        })
      } else if (input.type == 'in') {
        await db.part.update({
          where: { id: item.part },
          data: { availableStock: { increment: item.quantity } },
        })
      }
    }

    return db.transaction.create({
      data: input,
    })
  }

export const updateTransaction: MutationResolvers['updateTransaction'] = ({
  id,
  input,
}) => {
  return db.transaction.update({
    data: input,
    where: { id },
  })
}

export const deleteTransaction: MutationResolvers['deleteTransaction'] = ({
  id,
}) => {
  return db.transaction.delete({
    where: { id },
  })
}

export const Transaction: TransactionRelationResolvers = {
  user: (_obj, { root }) => {
    return db.transaction.findUnique({ where: { id: root?.id } }).user()
  },
}
