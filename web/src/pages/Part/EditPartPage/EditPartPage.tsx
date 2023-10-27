import EditPartCell from 'src/components/Part/EditPartCell'

type PartPageProps = {
  id: number
}

const EditPartPage = ({ id }: PartPageProps) => {
  return <EditPartCell id={id} />
}

export default EditPartPage
