/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { mdiAlert } from '@mdi/js'
import { Icon } from '@mdi/react'
import type { TransactionsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TransactionListItem from '../TransactionListItem/TransactionListItem'

export const beforeQuery = ({ filter }) => {
  filter = filter && ['both', 'in', 'out'].includes(filter) ? filter : 'both'

  return { variables: { filter } }
}

export const QUERY = gql`
  query TransactionsQuery($filter: FilterTransactionsByType!) {
    transactions(filter: $filter) {
      transactions {
        id
        date
        parts
        type
        user {
          firstName
          lastName
        }
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
  transactions,
}: CellSuccessProps<TransactionsQuery>) => {
  if (transactions.transactions.length == 0) return Empty()
  return (
    <div className="flex flex-col space-y-6 font-inter">
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1 normal-case">
          Filter:{' '}
          {transactions.filter == 'both'
            ? 'None'
            : transactions.filter.replace(
                transactions.filter[0],
                transactions.filter[0].toUpperCase()
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
                to={routes.adminTransactions({
                  filter: filter === 'None' ? 'both' : filter.toLowerCase(),
                })}
              >
                {filter}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {transactions.transactions.map((item, i) => {
        return (
          <TransactionListItem
            transaction={item}
            key={i}
            returnButton={false}
            admin
          />
        )
      })}
    </div>
  )
}
