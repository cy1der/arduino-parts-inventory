import { Link, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

import { addToBasket } from 'src/lib/basket'

import ToastNotification from '../ToastNotification'

interface Props {
  part: {
    id: number
    name: string
    description?: string
    availableStock: number
    imageUrl: string
    createdAt: string
  }
}

const thumbnail = (url: string) => {
  if (url.includes('no_image.png')) return url
  const parts = url.split('/')
  parts.splice(3, 0, 'resize=width:384')
  return parts.join('/')
}

const PartsGridUnit = ({ part }: Props) => {
  return (
    <div className="card-compact card w-72 space-y-3 bg-base-100 font-inter shadow-xl sm:w-96">
      <figure>
        <img
          className="h-48 object-cover"
          src={thumbnail(part.imageUrl)}
          width={384}
          height={128}
          alt={part.name + ' image'}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-between">
          <Link
            className="link-hover link w-auto overflow-hidden text-ellipsis whitespace-nowrap"
            to={routes.partDetails({ id: part.id })}
          >
            {part.name}
          </Link>
          {part.availableStock == 0 ? (
            <div className="badge badge-error">Out of stock</div>
          ) : (
            <div className="badge badge-ghost whitespace-nowrap">
              {part.availableStock + ' left'}
            </div>
          )}
        </h2>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {part.description}
        </p>
        <div className="card-actions justify-end">
          <button
            className={`btn btn-primary ${
              part.availableStock == 0 ? 'btn-disabled' : ''
            }`}
            onClick={() => {
              const newBasket = addToBasket(part, 1)

              if (typeof newBasket == 'string')
                toast.custom((t) => (
                  <ToastNotification
                    toast={t}
                    type="error"
                    message={newBasket}
                  />
                ))
              else
                toast.custom((t) => (
                  <ToastNotification
                    toast={t}
                    type="success"
                    message={`Added 1 ${part.name} to basket`}
                  />
                ))
            }}
          >
            Add to basket
          </button>
        </div>
      </div>
    </div>
  )
}

export default PartsGridUnit
