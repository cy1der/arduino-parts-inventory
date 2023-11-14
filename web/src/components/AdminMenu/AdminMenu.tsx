import { mdiWrench } from '@mdi/js'
import Icon from '@mdi/react'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

interface Props {
  mobile: boolean
  className?: string
}

const AdminMenu = ({ mobile, className }: Props) => {
  const { isAuthenticated, hasRole } = useAuth()

  return isAuthenticated && hasRole('admin') ? (
    <div className={className}>
      <details
        className={`dropdown ${
          mobile ? 'dropdown-start space-y-2' : 'dropdown-end space-y-4'
        }`}
      >
        <summary className="btn btn-ghost swap swap-rotate w-12 hover:shadow-lg">
          <Icon path={mdiWrench} className="h-8 w-8 text-base-content" />
        </summary>
        <div className="dropdown-content flex flex-col items-center space-y-3 rounded-xl bg-base-100 p-3 shadow-lg">
          <ul className="space-y-3 bg-base-100 text-base-content">
            <li>
              <Link
                to={routes.parts()}
                className="btn btn-ghost w-full font-inter hover:shadow-lg"
              >
                Parts
              </Link>
            </li>
            <li>
              <Link
                to={routes.adminTransactions()}
                className="btn btn-ghost w-full hover:shadow-lg"
              >
                <p className="font-inter">Transactions</p>
              </Link>
            </li>
          </ul>
        </div>
      </details>
    </div>
  ) : (
    <></>
  )
}

export default AdminMenu
