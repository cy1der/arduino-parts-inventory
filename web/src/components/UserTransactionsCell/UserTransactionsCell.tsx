/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { mdiAlert } from '@mdi/js'
import { Icon } from '@mdi/react'
import type { UserTransactionsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TransactionListItem from '../TransactionListItem/TransactionListItem'

export const beforeQuery = ({ filter, userId }) => {
  userId = userId ?? null
  filter = filter && ['both', 'in', 'out'].includes(filter) ? filter : 'both'

  return { variables: { filter, userId } }
}

export const QUERY = gql`
  query UserTransactionsQuery(
    $userId: Int!
    $filter: FilterTransactionsByType!
  ) {
    userTransactions(userId: $userId, filter: $filter) {
      transactions {
        id
        date
        parts
        type
      }
      filter
    }
  }
`

export const Loading = () => (
  <div className="flex w-auto justify-center">
    <p className="loading loading-bars loading-lg" />
  </div>
)

export const Empty = () => (
  <div className="flex">
    <div className="alert w-auto">
      <p className="text-center font-inter">It&#39;s empty in here...</p>
    </div>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div className="flex w-auto justify-center">
    <div className="alert alert-error w-auto">
      <Icon path={mdiAlert} className="h-6 w-6" />
      <p className="font-inter">Error! {error?.message}</p>
    </div>
  </div>
)

export const Success = ({
  userTransactions,
}: CellSuccessProps<UserTransactionsQuery>) => {
  if (userTransactions.transactions.length == 0) return Empty()
  return (
    <div className="flex flex-col space-y-6 font-inter">
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1 normal-case">
          Filter:{' '}
          {userTransactions.filter == 'both'
            ? 'None'
            : userTransactions.filter.replace(
                userTransactions.filter[0],
                userTransactions.filter[0].toUpperCase()
              )}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content rounded-box z-10 mt-3 w-auto space-y-3 bg-base-100 p-3 shadow"
        >
          {['None', 'In', 'Out'].map((filter) => (
            <li key={filter}>
              <Link
                className="btn btn-ghost w-full normal-case"
                to={routes.userTransactions({
                  filter: filter === 'None' ? 'both' : filter.toLowerCase(),
                })}
              >
                {filter}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {userTransactions.transactions.map((item, i) => {
        return <TransactionListItem transaction={item} key={i} />
      })}
    </div>
  )
}
