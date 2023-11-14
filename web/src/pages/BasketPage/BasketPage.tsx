import { MetaTags } from '@redwoodjs/web'

import { BasketCell } from 'src/components/BasketCell/BasketCell'

const BasketPage = () => {
  return (
    <>
      <MetaTags title="Basket" description="Basket page" />

      <div className="m-8">
        <h1 className="mb-8 font-inter text-3xl font-bold">Basket</h1>
        <BasketCell />
      </div>
    </>
  )
}

export default BasketPage
