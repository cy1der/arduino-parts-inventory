import type { DeletePartMutationVariables, FindPartById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ToastNotification from 'src/components/ToastNotification'
import { timeTag } from 'src/lib/formatters'

const DELETE_PART_MUTATION = gql`
  mutation DeletePartMutation($id: Int!) {
    deletePart(id: $id) {
      id
    }
  }
`

interface Props {
  part: NonNullable<FindPartById['part']>
}

const Part = ({ part }: Props) => {
  const [deletePart] = useMutation(DELETE_PART_MUTATION, {
    onCompleted: () => {
      toast.custom((t) => (
        <ToastNotification toast={t} type="success" message="Part deleted" />
      ))
      navigate(routes.parts())
    },
    onError: (error) => {
      toast.custom((t) => (
        <ToastNotification toast={t} type="error" message={error.message} />
      ))
    },
  })

  const onDeleteClick = (id: DeletePartMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete part ' + id + '?')) {
      deletePart({ variables: { id } })
    }
  }

  const preview = (url: string) => {
    if (url.includes('no_image.png')) return url
    const parts = url.split('/')
    parts.splice(3, 0, 'resize=height:500')
    return parts.join('/')
  }

  return (
    <>
      <div className="rw-segment font-inter">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Part {part.id} details
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{part.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{part.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{part.description}</td>
            </tr>
            <tr>
              <th>Available stock</th>
              <td>{part.availableStock}</td>
            </tr>
            <tr>
              <th>Image</th>
              <td>
                <img
                  alt=""
                  src={preview(part.imageUrl)}
                  style={{ display: 'block', margin: '2rem 0' }}
                />
              </td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(part.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPart({ id: part.id })}
          className="rw-button btn-primary"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button btn-error"
          onClick={() => onDeleteClick(part.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Part
