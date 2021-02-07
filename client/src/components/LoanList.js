import React, { Component } from 'react';
import axios from 'axios';

class LoanList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            loansCollection: [] 
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/loans')
            .then(res => {
                this.setState({ loansCollection: res.data });
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getAllLoans() {        
        return this.state.loansCollection.map((data, i) => {
            return <tr>
                <td><a href={`loans/${data._id}`}>{data.businessName}</a></td>
                <td>${data.loan.amount}</td>
                <td>{data.loan.status[0].currentStatus}</td>           
                </tr>;
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <td>Merchant </td>
                                <td>Amount Requested</td>
                                <td>Application Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getAllLoans()}
                        </tbody>
                    </table>
                </div>

        )
    }
}

export default LoanList;