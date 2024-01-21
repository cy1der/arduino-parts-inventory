import type { Part } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

import { addToBasket } from 'src/lib/basket'

import ToastNotification from '../ToastNotification'

interface Props {
  part: Part
}

const thumbnail = (url: string) => {
  if (url.includes('no_image.png')) return url
  const parts = url.split('/')
  parts.splice(3, 0, 'resize=width:384')
  return parts.join('/')
}

const PartsGridUnit = ({ part }: Props) => {
  return (
    <Link to={routes.partDetails({ id: part.id })}>
      <div className="card card-compact w-72 space-y-3 bg-base-100 font-inter shadow-xl transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl sm:w-96">
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
            {part.name}
            {part.availableStock == 0 ? (
              <div className="badge badge-error min-w-fit">Out of stock</div>
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
              onClick={(event) => {
                event.stopPropagation()
                event.preventDefault()

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
    </Link>
  )
}

export default PartsGridUnit
