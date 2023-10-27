import type { FindParts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Parts from 'src/components/Part/Parts'

export const QUERY = gql`
  query FindParts {
    parts {
      id
      name
      description
      availableStock
      imageUrl
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No parts yet. '}
      <Link to={routes.newPart()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ parts }: CellSuccessProps<FindParts>) => {
  return <Parts parts={parts} />
}
