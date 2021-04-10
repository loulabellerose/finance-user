import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../Constants';
var url = config.url.API_URL;

class LoanList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loansCollection: []
        };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage["user"]);
        const token = user.token;
        axios({
            method: 'get',
            url: `${url}/business`,
            headers: {token: token }
        })
            .then(res => {
                this.setState({ loansCollection: res.data });
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    sortLoans() {
        const cloneLoans = [...this.state.loansCollection];
        for(let i = 0; i <= cloneLoans.length -1; i++)  {
            for (let j = 0; j < cloneLoans.length-1; j++) {
                const loan1 = cloneLoans[j];
                const loan2 = cloneLoans[j+1];
                if( (loan2.loan.status[loan2.loan.status.length-1].createdAt) > loan1.loan.status[loan1.loan.status.length-1].createdAt) {
                    cloneLoans[j]  = loan2;
                    cloneLoans[j+1] = loan1;
                }
            }
        }
        return (
            cloneLoans
        )
    }

    getAllBusinessesWithLoans() {
        const sorted = this.sortLoans();
        return sorted.map((data, i) => {
            if (data.loan) {
                const arrayLength = data.loan.status.length;
                return <tr>
                    <td><a href={`/admin/loans/${data._id}`}>{data.businessName}</a></td>
                    <td>${data.loan.amount}</td>
                    <td>{data.loan.status[arrayLength-1].currentStatus}</td>
                    <td>{new Date(data.loan.status[arrayLength-1].createdAt).toLocaleString()}</td>
                </tr>
            }
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
                            <td>Most Recent Updated</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getAllBusinessesWithLoans()}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default LoanList;