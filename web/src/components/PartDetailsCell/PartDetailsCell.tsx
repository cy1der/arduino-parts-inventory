import { useState } from 'react'

import { mdiAlert, mdiPlus, mdiMinus } from '@mdi/js'
import { Icon } from '@mdi/react'
import type { FindPartDetailsById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { addToBasket } from 'src/lib/basket'

import ToastNotification from '../ToastNotification'

export const QUERY = gql`
  query FindPartDetailsById($id: Int!) {
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

const image = (url: string, size: number) => {
  if (url.includes('no_image.png')) return url
  const parts = url.split('/')
  parts.splice(3, 0, `resize=height:${size}`)
  return parts.join('/')
}

export const Success = ({ part }: CellSuccessProps<FindPartDetailsById>) => {
  const [toTake, setToTake] = useState(part.availableStock > 0 ? 1 : 0)
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <div className="col-span-2">
        <h1 className="font-inter text-4xl font-bold">{part.name}</h1>
      </div>

      <div className="order-first col-span-2 sm:order-2 sm:col-span-1">
        <div className="-z-10 flex sm:sticky sm:top-28">
          <div className="h-0 w-full bg-base-100" />
          <img
            alt={part.name}
            src={image(part.imageUrl, 640)}
            className="mb-8 w-full rounded-3xl object-cover sm:mb-0 sm:w-64 md:w-80 lg:w-96 xl:w-[32rem] 2xl:w-[40rem]"
          />
        </div>
      </div>
      <div className="col-span-2 space-y-8 font-inter sm:col-span-1">
        <p className="break-words text-lg">{part.description}</p>
        <div className="divider" />
        <p className="text-xl">
          <strong>Current stock:</strong> {part.availableStock}
        </p>
        <div className="flex space-x-5">
          <div className="join">
            <button
              className={`btn join-item ${
                toTake == 1 || part.availableStock == 0 ? 'btn-disabled' : ''
              }`}
              onClick={() => setToTake(toTake - 1)}
            >
              <Icon path={mdiMinus} className="h-6 w-6" />
            </button>
            <p className="btn join-item items-center font-inter text-lg">
              {toTake}
            </p>
            <button
              className={`btn join-item ${
                toTake == part.availableStock ? 'btn-disabled' : ''
              }`}
              onClick={() => setToTake(toTake + 1)}
            >
              <Icon path={mdiPlus} className="h-6 w-6" />
            </button>
          </div>
          <button
            className={`btn btn-primary ${toTake == 0 ? 'btn-disabled' : ''}`}
            onClick={() => {
              const newBasket = addToBasket(part, toTake)

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
                    message={`Added ${toTake} ${part.name} to basket`}
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
