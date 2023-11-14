import { mdiHome } from '@mdi/js'
import Icon from '@mdi/react'

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel?: string
  buttonTo?: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <div className="space-x-3">
          <Link to={routes.home()} className="btn btn-ghost hover:shadow-lg">
            <Icon path={mdiHome} className="h-8 w-8" />
          </Link>
          <h1 className="rw-heading rw-heading-primary rw-button btn-ghost normal-case">
            <Link to={routes[titleTo]()}>{title}</Link>
          </h1>
        </div>
        {buttonLabel && buttonTo ? (
          <Link to={routes[buttonTo]()} className="rw-button btn-success">
            <div className="rw-button-icon">+</div> {buttonLabel}
          </Link>
        ) : (
          <></>
        )}
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ScaffoldLayout
