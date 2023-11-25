import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { Part, Transaction, TransactionType } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

import ToastNotification from '../ToastNotification'

interface Props {
  transaction:
    | {
        id: number
        date: string
        parts: Prisma.JsonValue[]
        type: TransactionType
      }
    | Transaction
  returnButton?: boolean
  admin?: boolean
}

dayjs.extend(relativeTime)

export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransactionMutation($id: Int!, $userId: Int!) {
    returnTransaction(id: $id, userId: $userId) {
      id
    }
  }
`

const TransactionListItem = ({
  transaction,
  returnButton = true,
  admin = false,
}: Props) => {
  const elapsedTime = dayjs(transaction.date).fromNow()

  const [returnTransaction, { loading }] = useMutation(
    UPDATE_TRANSACTION_MUTATION,
    {
      onCompleted: () => {
        toast.custom((t) => (
          <ToastNotification
            toast={t}
            type="success"
            message="Transaction updated"
          />
        ))
      },
      onError: (error) => {
        toast.custom((t) => (
          <ToastNotification toast={t} type="error" message={error.message} />
        ))
      },
    }
  )

  const { currentUser } = useAuth()

  return (
    <div className="collapse collapse-arrow max-w-5xl bg-base-200 font-inter">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        <div className="items-center justify-between space-x-3 space-y-3 sm:flex sm:space-y-0">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {transaction.parts.length} items
          </p>
          <div className="w-fit flex-col space-x-3">
            {admin ? (
              <div className="badge badge-primary whitespace-nowrap sm:badge-lg">{`${
                (transaction as Transaction).user?.firstName
              } ${(transaction as Transaction).user?.lastName}`}</div>
            ) : (
              <></>
            )}
            <div
              className={`badge sm:badge-lg ${
                transaction.type == 'out' ? 'badge-error' : 'badge-success'
              }`}
            >
              {transaction.type.replace(
                transaction.type[0],
                transaction.type[0].toUpperCase()
              )}
            </div>
            <div className="badge whitespace-nowrap bg-base-300 sm:badge-lg">
              {elapsedTime.replace(
                elapsedTime[0],
                elapsedTime[0].toUpperCase()
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="collapse-content space-y-3">
        <ul className="mx-4 list-disc space-y-2">
          {transaction.parts.map((raw) => {
            const part = JSON.parse(raw['part']) as Part
            const quantity = raw['quantity']
            return (
              <li className="list-item" key={part.id}>
                <div className="flex justify-between space-x-3">
                  <p>{part.name}</p>
                  <div className="badge badge-info">
                    <p>Quantity: {quantity}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        {transaction.type == 'out' && returnButton ? (
          <button
            className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
            disabled={loading}
            onClick={() =>
              returnTransaction({
                variables: { id: transaction.id, userId: currentUser.id },
              })
            }
          >
            Return
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default TransactionListItem
