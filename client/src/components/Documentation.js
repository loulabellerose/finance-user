

export default function Documentation (props) {
  console.log(this.props.match.params);
  
    return (
      <div className="wrapper">
          <div class="img-fluid">
              <img src={`https://rise-app-40245759.s3-eu-west-1.amazonaws.com/uploads/${this.props.match.params}`} max-width="100%"/>
          </div>
        </div>
      )
}