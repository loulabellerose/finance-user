import React, { Component } from 'react';
import axios from 'axios';

class Loan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loan: {

            }
        };
    }

    async componentDidMount() {
        await axios.get(`http://localhost:5000/loans/${this.props.match.params.loanId}`)
            .then(res => {
                this.setState({ loan: res.data });
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <td>Loan ID</td>
                                <td>Merchant ID</td>
                                <td>Documents</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{this.state.loan.loanId}</td>
                            <td>{this.state.loan.merchantId}</td>
                            <td>{this.state.loan.documents}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Loan;