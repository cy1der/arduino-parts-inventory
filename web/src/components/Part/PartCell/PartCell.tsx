import type { FindPartById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Part from 'src/components/Part/Part'

export const QUERY = gql`
  query FindPartById($id: Int!) {
    part: part(id: $id) {
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

export const Empty = () => <div>Part not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ part }: CellSuccessProps<FindPartById>) => {
  return <Part part={part} />
}
