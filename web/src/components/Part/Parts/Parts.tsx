import type { DeletePartMutationVariables, FindParts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Part/PartsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_PART_MUTATION = gql`
  mutation DeletePartMutation($id: Int!) {
    deletePart(id: $id) {
      id
    }
  }
`

const PartsList = ({ parts }: FindParts) => {
  const [deletePart] = useMutation(DELETE_PART_MUTATION, {
    onCompleted: () => {
      toast.success('Part deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeletePartMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete part ' + id + '?')) {
      deletePart({ variables: { id } })
    }
  }

  const thumbnail = (url: string) => {
    if (url.includes('no_image.png')) return url
    const parts = url.split('/')
    parts.splice(3, 0, 'resize=width:100')
    return parts.join('/')
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Available stock</th>
            <th>Image</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id}>
              <td>{truncate(part.id)}</td>
              <td>{truncate(part.name)}</td>
              <td>{truncate(part.description)}</td>
              <td>{truncate(part.availableStock)}</td>
              <td>
                <a href={part.imageUrl} target="_blank" rel="noreferrer">
                  <img
                    alt={`${part.name} thumbnail`}
                    src={thumbnail(part.imageUrl)}
                    style={{ maxWidth: '50px' }}
                  />
                </a>
              </td>
              <td>{timeTag(part.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.part({ id: part.id })}
                    title={'Show part ' + part.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPart({ id: part.id })}
                    title={'Edit part ' + part.id}
                    className="rw-button rw-button-small btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete part ' + part.id}
                    className="rw-button rw-button-small btn-error"
                    onClick={() => onDeleteClick(part.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PartsList
