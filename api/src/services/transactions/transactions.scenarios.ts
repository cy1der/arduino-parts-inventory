import type { Prisma, Transaction } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        type: 'in',
        parts: { foo: 'bar' },
        user: {
          create: {
            firstName: 'String',
            lastName: 'String',
            email: 'String2420106',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        type: 'in',
        parts: { foo: 'bar' },
        user: {
          create: {
            firstName: 'String',
            lastName: 'String',
            email: 'String1596322',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
