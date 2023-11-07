import { Part } from 'types/graphql'

const BASKET_KEY = 'basket'

export interface BasketItem {
  part: Part
  quantity: number
}

export const getBasket = (): BasketItem[] => {
  const basketRaw = localStorage.getItem(BASKET_KEY)
  const basket: BasketItem[] = basketRaw ? JSON.parse(basketRaw) : []

  return basket
}

export const setBasket = (newBasket: BasketItem[]): BasketItem[] => {
  localStorage.setItem(BASKET_KEY, JSON.stringify(newBasket))
  return getBasket()
}

export const addToBasket = (
  part: Part,
  quantity: number
): BasketItem[] | string => {
  const basket = getBasket()
  const existingPartIndex = basket.findIndex((item) => item.part.id == part.id)

  if (existingPartIndex !== -1) {
    const basketPart = basket[existingPartIndex]

    if (basketPart.quantity + quantity <= basketPart.part.availableStock)
      basket[existingPartIndex].quantity += quantity
    else return `Cannot exceed number of items left (${part.availableStock})`
  } else basket.push({ part, quantity })

  localStorage.setItem(BASKET_KEY, JSON.stringify(basket))

  return basket
}

export const removeFromBasket = (index: number): BasketItem[] | string => {
  const basket = getBasket()

  if (index >= 0 && index < basket.length) basket.splice(index, 1)
  else return 'Error: index out of bounds'

  localStorage.setItem(BASKET_KEY, JSON.stringify(basket))

  return basket
}

export const clearBasket = (): BasketItem[] => {
  localStorage.removeItem(BASKET_KEY)

  return []
}
