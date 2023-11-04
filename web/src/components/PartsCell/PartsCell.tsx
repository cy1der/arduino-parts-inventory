/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import {
  mdiAlert,
  mdiChevronRight,
  mdiChevronLeft,
  mdiChevronDoubleRight,
  mdiChevronDoubleLeft,
} from '@mdi/js'
import { Icon } from '@mdi/react'
import type { PartsQuery, SortMethod, SortOrder } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PartsGridUnit from '../PartsGridUnit/PartsGridUnit'

const POSTS_PER_PAGE = 8

export const beforeQuery = ({ page, sort, order }) => {
  page = page ? parseInt(page, 10) : 1
  sort =
    sort &&
    (['createdAt', 'description', 'id', 'name', 'stock'].includes(sort)
      ? sort
      : 'id')
  order =
    order && (['ascending', 'descending'].includes(order) ? order : 'ascending')

  return { variables: { page, sort, order } }
}

export const QUERY = gql`
  query PartsQuery($page: Int, $sort: SortMethod, $order: SortOrder) {
    partPage(page: $page, sort: $sort, order: $order) {
      parts {
        id
        name
        description
        availableStock
        imageUrl
      }
      count
      page
      sort
      order
    }
  }
`

export const Loading = () => (
  <div className="flex w-auto justify-center">
    <p className="loading loading-bars loading-lg" />
  </div>
)

export const Empty = () => (
  <div className="flex justify-center">
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

export const Success = ({ partPage }: CellSuccessProps<PartsQuery>) => {
  const sortMethodToText = (sortByText: string) => {
    switch (sortByText as SortMethod) {
      case 'createdAt':
        sortByText = 'Created at'
        break

      case 'description':
        sortByText = 'Description'
        break

      case 'id':
        sortByText = 'ID'
        break

      case 'name':
        sortByText = 'Name'
        break

      case 'stock':
        sortByText = 'Stock'
        break
    }

    return sortByText
  }

  const sortOrderToText = (orderText: string) => {
    switch (orderText as SortOrder) {
      case 'ascending':
        orderText = 'Ascending'
        break

      case 'descending':
        orderText = 'Descending'
        break
    }

    return orderText
  }

  if (partPage.count == 0) return Empty()
  else {
    const sortByText: string = sortMethodToText(partPage.sort)
    const orderText: string = sortOrderToText(partPage.order)

    return (
      <div className="flex flex-col items-center space-y-6">
        <div className="flex space-x-3 font-inter">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1 normal-case">
              Sort: {sortByText}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content rounded-box z-[1] mt-3 w-auto space-y-3 bg-base-100 p-3 shadow"
            >
              {['id', 'createdAt', 'description', 'name', 'stock'].map(
                (sort) => (
                  <li key={sort}>
                    <Link
                      className="btn btn-ghost w-full normal-case"
                      to={routes.home({
                        page: partPage.page,
                        sort,
                        order: partPage.order,
                      })}
                    >
                      {sortMethodToText(sort)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1 normal-case">
              Order: {orderText}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content rounded-box z-[1] mt-3 w-auto space-y-3 bg-base-100 p-4 shadow"
            >
              {['ascending', 'descending'].map((order) => (
                <li key={order}>
                  <Link
                    className="btn btn-ghost w-full normal-case"
                    to={routes.home({
                      page: partPage.page,
                      sort: partPage.sort,
                      order,
                    })}
                  >
                    {sortOrderToText(order)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid place-items-center gap-x-6 gap-y-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {partPage.parts.map((part) => (
            <PartsGridUnit key={part.id} part={part} />
          ))}
        </div>
        <div className="join">
          <Link
            className={`btn join-item ${
              partPage.page == 1 ? 'btn-disabled' : ''
            }`}
            to={routes.home({
              page: 1,
              sort: partPage.sort,
              order: partPage.order,
            })}
          >
            <Icon path={mdiChevronDoubleLeft} className="h-6 w-6" />
          </Link>
          <Link
            className={`btn join-item ${
              partPage.page == 1 ? 'btn-disabled' : ''
            }`}
            to={routes.home({
              page: partPage.page - 1,
              sort: partPage.sort,
              order: partPage.order,
            })}
          >
            <Icon path={mdiChevronLeft} className="h-6 w-6" />
          </Link>
          <p className="btn join-item items-center font-inter normal-case">
            Page {partPage.page} of {Math.ceil(partPage.count / POSTS_PER_PAGE)}
          </p>
          <Link
            className={`btn join-item ${
              partPage.page == Math.ceil(partPage.count / POSTS_PER_PAGE)
                ? 'btn-disabled'
                : ''
            }`}
            to={routes.home({
              page: partPage.page + 1,
              sort: partPage.sort,
              order: partPage.order,
            })}
          >
            <Icon path={mdiChevronRight} className="h-6 w-6" />
          </Link>
          <Link
            className={`btn join-item ${
              partPage.page == Math.ceil(partPage.count / POSTS_PER_PAGE)
                ? 'btn-disabled'
                : ''
            }`}
            to={routes.home({
              page: Math.ceil(partPage.count / POSTS_PER_PAGE),
              sort: partPage.sort,
              order: partPage.order,
            })}
          >
            <Icon path={mdiChevronDoubleRight} className="h-6 w-6" />
          </Link>
        </div>
      </div>
    )
  }
}
