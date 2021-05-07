import Image from 'react-bootstrap/Image';
import { useParams, useHistory } from 'react-router-dom';

export default function Documentation(props) {
  let { loanId } = useParams();
  let history = useHistory();

  return (
    <div className="wrapper">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"></div>
      <div className="row">
        <div className ="col">
        <button class="btn btn-secondary disabled status-badge" onClick={() => history.goBack()}> &lt; BACK</button>
      </div>
      </div>
      <Image src={`https://rise-app-40245759.s3-eu-west-1.amazonaws.com/uploads/${loanId}`} fluid />
    </div>
  )
}