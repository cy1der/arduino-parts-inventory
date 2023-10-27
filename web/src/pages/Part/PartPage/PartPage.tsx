import PartCell from 'src/components/Part/PartCell'

type PartPageProps = {
  id: number
}

const PartPage = ({ id }: PartPageProps) => {
  return <PartCell id={id} />
}

export default PartPage
