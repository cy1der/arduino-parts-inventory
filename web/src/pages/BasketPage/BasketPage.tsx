import { useState } from 'react'

import { mdiDelete, mdiMinus, mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'

import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import ToastNotification from 'src/components/ToastNotification'
import {
  clearBasket,
  getBasket,
  removeFromBasket,
  setBasket,
} from 'src/lib/basket'

const thumbnail = (url: string) => {
  if (url.includes('no_image.png')) return url
  const parts = url.split('/')
  parts.splice(3, 0, 'resize=width:160')
  return parts.join('/')
}

const BasketPage = () => {
  const { isAuthenticated } = useAuth()
  const [basket, setBasketState] = useState(getBasket())
  return (
    <>
      <MetaTags title="Basket" description="Basket page" />

      <div className="m-8">
        <h1 className="mb-8 font-inter text-3xl font-bold">Basket</h1>
        <div className="space-y-3">
          {basket.length > 0 ? (
            basket.map((item, i) => (
              <div
                key={i}
                className="flex max-w-5xl items-center rounded-xl bg-base-100 shadow-xl"
              >
                <img
                  alt={item.part.name}
                  className="hidden h-20 w-20 rounded-l-xl object-cover sm:flex"
                  src={thumbnail(item.part.imageUrl)}
                />
                <div className="m-3 w-full items-center justify-between space-y-3 sm:flex sm:space-y-0">
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap font-inter text-lg font-bold">
                    {item.part.name}
                  </p>
                  <div className="flex justify-between space-x-3">
                    <div className="join">
                      <button
                        className={`btn join-item ${
                          item.quantity == 1 ? 'btn-disabled' : ''
                        }`}
                        onClick={() => {
                          const newBasket = basket
                          newBasket[i].quantity -= 1
                          setBasketState(setBasket(newBasket))
                        }}
                      >
                        <Icon path={mdiMinus} className="h-6 w-6" />
                      </button>
                      <p className="btn join-item items-center font-inter text-lg">
                        {item.quantity}
                      </p>
                      <button
                        className={`btn join-item ${
                          item.quantity == item.part.availableStock
                            ? 'btn-disabled'
                            : ''
                        }`}
                        onClick={() => {
                          const newBasket = basket
                          newBasket[i].quantity += 1
                          setBasketState(setBasket(newBasket))
                        }}
                      >
                        <Icon path={mdiPlus} className="h-6 w-6" />
                      </button>
                    </div>
                    <button
                      className="btn btn-ghost hover:shadow-lg"
                      onClick={() => {
                        const newBasket = removeFromBasket(i)

                        if (typeof newBasket == 'string')
                          toast.custom((t) => (
                            <ToastNotification
                              toast={t}
                              type="error"
                              message={newBasket}
                            />
                          ))
                        else {
                          setBasketState(newBasket)
                          toast.custom((t) => (
                            <ToastNotification
                              toast={t}
                              type="success"
                              message={`Removed ${item.part.name} from basket`}
                            />
                          ))
                        }
                      }}
                    >
                      <Icon
                        path={mdiDelete}
                        className="h-8 w-8 text-base-content"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex">
              <div className="alert w-auto shadow-lg">
                <p className="text-center font-inter">
                  It&#39;s empty in here...
                </p>
              </div>
            </div>
          )}
          {basket.length > 0 ? (
            <div className="flex space-x-3 pt-3">
              <button
                onClick={() => {
                  setBasketState(clearBasket())
                  toast.custom((t) => (
                    <ToastNotification
                      toast={t}
                      type="success"
                      message="Basket cleared"
                    />
                  ))
                }}
                className="btn font-inter"
              >
                Clear basket
              </button>
              <button
                onClick={() => {
                  if (!isAuthenticated)
                    toast.custom((t) => (
                      <ToastNotification
                        toast={t}
                        type="error"
                        message="You must be logged in to do that"
                      />
                    ))
                  else {
                    toast.custom((t) => (
                      <ToastNotification toast={t} type="info" message="Todo" />
                    ))
                  }
                }}
                className="btn btn-primary font-inter"
              >
                Checkout
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}

export default BasketPage
