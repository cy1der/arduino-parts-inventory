import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PartForm from 'src/components/Part/PartForm'

import type { CreatePartInput } from 'types/graphql'

const CREATE_PART_MUTATION = gql`
  mutation CreatePartMutation($input: CreatePartInput!) {
    createPart(input: $input) {
      id
    }
  }
`

const NewPart = () => {
  const [createPart, { loading, error }] = useMutation(CREATE_PART_MUTATION, {
    onCompleted: () => {
      toast.success('Part created')
      navigate(routes.parts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreatePartInput) => {
    createPart({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Part</h2>
      </header>
      <div className="rw-segment-main">
        <PartForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPart
