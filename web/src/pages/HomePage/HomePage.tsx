import { SortMethod, SortOrder } from 'types/graphql'

import { MetaTags } from '@redwoodjs/web'

import PartsCell from 'src/components/PartsCell'

interface Props {
  page: number
  sort: SortMethod
  order: SortOrder
}

const HomePage = ({ page = 1, sort = 'id', order = 'ascending' }: Props) => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="my-16 text-center font-inter md:my-24">
        <h1 className="text-4xl font-extrabold tracking-wide md:text-6xl">
          Arduino Parts Inventory
        </h1>
        <p className="pt-4 text-xl">Only take what you need</p>
      </div>
      <PartsCell page={page} sort={sort} order={order} />
    </>
  )
}

export default HomePage
