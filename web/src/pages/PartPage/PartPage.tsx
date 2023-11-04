import { MetaTags } from '@redwoodjs/web'

import PartDetailsCell from 'src/components/PartDetailsCell'

interface Props {
  id: number
}

const PartPage = ({ id }: Props) => {
  return (
    <>
      <MetaTags title="Part" description="Part page" />

      <div className="m-8">
        <PartDetailsCell id={id} />
      </div>
    </>
  )
}

export default PartPage
