import Image from 'react-bootstrap/Image';

export default function Documentation(props) {
  let { loanId } = useParams();

  return (
    <div className="wrapper">
      <Image src={`https://rise-app-40245759.s3-eu-west-1.amazonaws.com/uploads/${loanId}`} fluid />
    </div>
  )
}