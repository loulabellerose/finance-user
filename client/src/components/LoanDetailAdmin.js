import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../Constants';
var url = config.url.API_URL;

class LoanDetailAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            business: {
            },
            merchant: {

            },
            isLoaded: false,
            status: {
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ statusUpdate: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault()
      this.setState({
            status: this.state.statusUpdate
        });
        const user = JSON.parse(localStorage["user"]);
        const token = user.token;

        axios({
            method: 'post',
            url: `${url}/loans/${this.props.match.params.loanId}`,
            headers: { token: token },
            data: {
                currentStatus: this.state.statusUpdate
            }
        })
            .then(() => {
                
            })
            .then((res) => {
                console.log(res.data)
                alert(`Loan application status updated`)
                //Add a redirect or reload here
            }).catch((error) => {
                console.log(error)
            });
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage["user"]);
        const token = user.token;
        await axios({
            method: 'get',
            url: `${url}/business/${this.props.match.params.loanId}`,
            headers: { token: token }
        })
            .then(res => {
                this.setState({ business: res.data, isLoaded: true })
                //console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        await axios({
            method: 'get',
            url: `${url}/merchants/${this.state.business.merchantId}`,
            headers: { token: token }
        })
            .then(res => {
                this.setState({ merchant: res.data })
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if (!this.state.isLoaded) {
            return (<div>Loading...</div>);
        }
        else {
            const loan = {
                loan: this.state.business.loan
            };
            console.log(loan.loan._id);
            const arrayLength = loan.loan.status.length;
            return (
                <div className="wrapper">
                    <div className="form-row">
                        <div className="col">
                            <label>Business Name: </label>
                            <h5>{this.state.business.businessName}</h5>
                        </div>

                        <div className="col">
                            <label>Loan application value:</label>
                            <h5>£{loan.loan.amount} </h5>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <label>Current status:</label>
                            <h5>{loan.loan.status[arrayLength - 1].currentStatus} </h5>
                        </div>


                        <div className="col">
                            <form onSubmit={this.handleSubmit}>
                                <label>Update status:</label>
                                <p>
                                    <select value={this.state.statusUpdate} onChange={this.handleChange}>
                                        <option statusUpdate="">SELECT: </option>
                                        <option statusUpdate="requested">Documentation Requested</option>
                                        <option statusUpdate="pending">Pending Approval</option>
                                        <option statusUpdate="rejected">Rejected</option>
                                        <option statusUpdate="approved">Approved</option>
                                    </select>
                                    <input type="submit" value="Update" />
                                </p>
                            </form>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <label>Gross Monthly Sales:</label>
                            <h5> £{this.state.business.grossMonthlySales}</h5>
                        </div>

                        <div className="col">
                            <label>Average Transaction Value:</label>
                            <h5> £{this.state.business.averageTransactionValue}</h5>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <label>Merchant Account Holder:</label>
                            <h5>{this.state.merchant.accountHolderName}</h5>
                        </div>

                        <div className="col">
                            <label>Merchant Email:</label>
                            <h5> {this.state.merchant.email}</h5>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <label>Merchant Address:</label>
                            <h5> {this.state.merchant.postalAddress}</h5>
                        </div>

                        <div className="col">
                            <label>Merchant Contact No:</label>
                            <h5> {this.state.merchant.phone}</h5>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <label>Uploaded Documentation:</label>
                            <a href={`/admin/loans/${this.state.business._id}/docs`}>View Documentation</a>
                        </div>

                    </div>

                </div>
            )

        }
    }
}

export default LoanDetailAdmin;