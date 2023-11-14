import { mdiAlert } from '@mdi/js'
import Icon from '@mdi/react'
import { FilterTransactionsByType } from 'types/graphql'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import UserTransactionsCell from 'src/components/UserTransactionsCell'

interface Props {
  filter: FilterTransactionsByType
}

const TransactionsPage = ({ filter = 'both' }: Props) => {
  const { isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Transactions" description="Transactions page" />

      <div className="m-8">
        <h1 className="mb-8 font-inter text-3xl font-bold">
          Transaction History
        </h1>
        {isAuthenticated ? (
          <UserTransactionsCell
            filter={filter}
            userId={currentUser ? currentUser.id : -1}
          />
        ) : (
          <div className="flex w-auto justify-center">
            <div className="alert alert-error w-auto">
              <Icon path={mdiAlert} className="h-6 w-6" />
              <p className="font-inter">You must be logged in to do that.</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default TransactionsPage
