import type { EditPartById, UpdatePartInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PartForm from 'src/components/Part/PartForm'
import ToastNotification from 'src/components/ToastNotification'

export const QUERY = gql`
  query EditPartById($id: Int!) {
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
const UPDATE_PART_MUTATION = gql`
  mutation UpdatePartMutation($id: Int!, $input: UpdatePartInput!) {
    updatePart(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ part }: CellSuccessProps<EditPartById>) => {
  const [updatePart, { loading, error }] = useMutation(UPDATE_PART_MUTATION, {
    onCompleted: () => {
      toast.custom((t) => (
        <ToastNotification toast={t} type="success" message="Part updated" />
      ))
      navigate(routes.parts())
    },
    onError: (error) => {
      toast.custom((t) => (
        <ToastNotification toast={t} type="error" message={error.message} />
      ))
    },
  })

  const onSave = (input: UpdatePartInput, id: EditPartById['part']['id']) => {
    updatePart({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Part {part?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PartForm part={part} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
