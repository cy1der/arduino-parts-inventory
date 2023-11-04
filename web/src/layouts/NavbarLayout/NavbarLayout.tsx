import { mdiChip, mdiMenu } from '@mdi/js'
import Icon from '@mdi/react'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import NavbarAccountIcon from 'src/components/NavbarAccountIcon/NavbarAccountIcon'
import ThemeToggle from 'src/components/ThemeToggle/ThemeToggle'

type NavBarLayoutProps = {
  children?: React.ReactNode
}

const NavBarLayout = ({ children }: NavBarLayoutProps) => {
  const { hasRole } = useAuth()

  return (
    <>
      <div className="navbar sticky top-0 z-50 bg-base-100 shadow-lg">
        <div className="justify-start space-x-3">
          <Icon
            path={mdiChip}
            className="ml-3 hidden h-10 text-logo md:block"
          />
          <Link
            to={routes.home()}
            className="btn btn-ghost items-center hover:shadow-lg"
          >
            <p className="font-inter text-xl normal-case tracking-tight">
              Parts Inventory
            </p>
          </Link>
        </div>
        <div className="ml-auto justify-end space-x-3">
          {hasRole('admin') ? (
            <ul className="relative hidden items-center space-x-3 lg:flex">
              <li>
                <Link
                  to={routes.parts()}
                  className="btn btn-ghost font-inter hover:shadow-lg"
                >
                  Parts
                </Link>
              </li>
            </ul>
          ) : (
            <></>
          )}
          <ThemeToggle />
          <NavbarAccountIcon mobile={false} className="hidden lg:block" />
          <div className="lg:hidden">
            <input
              id="mobile-menu-drawer"
              type="checkbox"
              className="drawer-toggle"
              defaultChecked={false}
            />
            <div className="drawer-content">
              <label
                htmlFor="mobile-menu-drawer"
                className="btn btn-ghost drawer-button hover:shadow-lg"
              >
                <Icon path={mdiMenu} className="h-8 w-8" />
              </label>
            </div>
            <div className="drawer-side z-50">
              <label htmlFor="mobile-menu-drawer" className="drawer-overlay">
                <br />
              </label>
              <ul className="min-h-full w-80 space-y-3 bg-base-100 p-3 text-base-content shadow-lg">
                <li>
                  <div className="flex items-center justify-between">
                    <Icon path={mdiChip} className="ml-3 h-10 text-logo" />
                    <Link
                      to={routes.home()}
                      className="btn btn-ghost items-center hover:shadow-lg"
                    >
                      <p className="font-inter text-xl normal-case tracking-tight">
                        Parts Inventory
                      </p>
                    </Link>
                    <NavbarAccountIcon mobile={true} />
                  </div>
                </li>
                {hasRole('admin') ? (
                  <li>
                    <Link
                      to={routes.parts()}
                      className="btn btn-ghost w-full hover:shadow-lg"
                    >
                      <p className="font-inter text-base">Parts</p>
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <main className="m-3">{children}</main>
    </>
  )
}

export default NavBarLayout
