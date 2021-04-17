import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../Constants';
import './LoanList.css';
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
            headers: { token: token }
        })
            .then(res => {
                this.setState({ loansCollection: res.data });
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
/*
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
*/
    getAllBusinessesWithLoans() {
        //const sorted = this.sortLoans();
        //return sorted.map((data, i) => {
            return this.state.loansCollection.map((data, i) => {
            if (data.loan) {
                const arrayLength = data.loan.status.length;
                let statusBadge = "";
                if ((data.loan.status[arrayLength - 1].currentStatus) === "Approved") {
                    statusBadge = <p class="btn btn-outline-success disabled status-badge">{data.loan.status[arrayLength - 1].currentStatus}</p>
                }
                else if ((data.loan.status[arrayLength - 1].currentStatus) === "Rejected") {
                    statusBadge = <p class="btn btn-outline-danger disabled status-badge">{data.loan.status[arrayLength - 1].currentStatus}</p>
                }
                else {
                    statusBadge = <p class="btn btn-outline-secondary disabled status-badge">{data.loan.status[arrayLength - 1].currentStatus}</p>
                }
                return <tr>
                    <td className="app-id">{data._id}</td>
                    <td className="business-name"><a href={`/dashboard/loans/${data._id}`}>{data.businessName}</a></td>
                    <td>${data.loan.amount}</td>
                    <td>{new Date(data.loan.status[arrayLength - 1].createdAt).toLocaleString('en-GB')}</td>
                    <td>{statusBadge}</td>
                </tr>;
            }
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <td>Application ID</td>
                            <td>Business Name</td>
                            <td>Amount Requested</td>
                            <td>Application Status</td>
                            <td>Most Recent Update</td>
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