import { mdiAlert } from '@mdi/js'
import Icon from '@mdi/react'
import { FilterTransactionsByType } from 'types/graphql'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import AdminTransactionsCell from 'src/components/AdminTransactionsCell'

interface Props {
  filter: FilterTransactionsByType
}

const AdminTransactionsPage = ({ filter = 'both' }: Props) => {
  const { isAuthenticated, hasRole } = useAuth()

  return (
    <>
      <MetaTags
        title="Admin Transactions"
        description="Admin Transactions page"
      />

      <div className="m-8">
        <p className="mb-8 font-inter text-3xl font-bold">Transactions</p>
        {isAuthenticated ? (
          hasRole('admin') ? (
            <AdminTransactionsCell filter={filter} />
          ) : (
            <div className="flex w-auto justify-center">
              <div className="alert alert-error w-auto">
                <Icon path={mdiAlert} className="h-6 w-6" />
                <p className="font-inter">You must be admin to do that.</p>
              </div>
            </div>
          )
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

export default AdminTransactionsPage
