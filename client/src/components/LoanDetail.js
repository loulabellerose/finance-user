import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../Constants';
import './LoanDetail.css';
var url = config.url.API_URL;

class LoanDetail extends Component {

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
        e.preventDefault();
        let updateMessage = 'Update to your loan application status';

        //Below calls function to send push notification to merchant's device if status update matches condition

        if (this.state.statusUpdate == 'Documentation Requested') {
            updateMessage = 'Update to loan application status: documentation has been requested';
        }

        else if (this.state.statusUpdate == 'Approved') {
            updateMessage = 'Update to loan application status: your loan application was approved!';
        }

        else if (this.state.statusUpdate == 'Rejected') {
            updateMessage = 'Update to loan application status: your loan application was rejected';
        }

        this.setState({
            status: this.state.statusUpdate,
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
                axios({
                    method: 'post',
                    url: `${url}/loans/${this.props.match.params.loanId}/notify`,
                    headers: { token: token },
                    data: {
                        update: updateMessage
                    }
                })
            })
            .then((res) => {
                //console.log(res.data)
                alert(`Loan application status updated`)
                //window.location.reload(true);
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
            const arrayLength = loan.loan.status.length;
            let element = "";
            if ((loan.loan.status[arrayLength - 1].currentStatus) !== "Submitted by Merchant" && (loan.loan.status[arrayLength - 1].currentStatus) !== "Documentation Requested") {
                element = (
                    <div className="wrapper-documentation">
                        <div className="row">
                            <div className="col" align="center">
                                <div className="loan-detail-header">
                                    <h5>Documentation In Support of RISE Application</h5>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div>
                                    <label>View Documentation:</label>
                                    <h5>
                                        <button type="button" class="btn-documentation btn btn-secondary">
                                            <a href={`/dashboard/loans/${this.state.business._id}/docs`}>Uploaded Image</a>
                                        </button>
                                    </h5>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            let statusBadge = "";
            if ((loan.loan.status[arrayLength - 1].currentStatus) === "Approved") {
                statusBadge = <h5 class="btn btn-outline-success disabled">{loan.loan.status[arrayLength - 1].currentStatus}</h5>
            }
            else if ((loan.loan.status[arrayLength - 1].currentStatus) === "Rejected") {
                statusBadge = <h5 class="btn btn-outline-danger disabled">{loan.loan.status[arrayLength - 1].currentStatus}</h5>
            }
            else {
                statusBadge = <h5 class="btn btn-outline-secondary disabled">{loan.loan.status[arrayLength - 1].currentStatus}</h5>
            }
            return (
                <div className="wrapper">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"></div>
                    <div className="form-row">
                        <div className="col">
                            <label>Business Name: </label>
                            <h5>{this.state.business.businessName}</h5>
                        </div>

                        <div className="col">
                            <label>Application #: </label>
                            <p>{loan.loan._id}</p>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <label>Loan application value:</label>
                            <h5>£{loan.loan.amount} </h5>
                        </div>

                        <div className="col">
                            <label>Current status:</label>
                            <p>
                                {statusBadge}
                            </p>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <form onSubmit={this.handleSubmit}>
                                <label>Update status:</label>
                                <p>
                                    <select statusUpdate={this.state.statusUpdate} onChange={this.handleChange} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option statusUpdate="">SELECT: </option>
                                        <option statusUpdate="requested">Documentation Requested</option>
                                        <option statusUpdate="pending">Pending Approval</option>
                                        <option statusUpdate="rejected">Rejected</option>
                                    </select>
                                    <input type="submit" value="Update" />
                                </p>
                            </form>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col" align="center">
                            <div className="loan-detail-header">
                                <h5>Business Sales Data</h5>
                            </div>
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

                    <div className="row">
                        <div className="col" align="center">
                            <div className="loan-detail-header">
                                <h5>Merchant Account Details</h5>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <label>Merchant Account Holder:</label>
                            <h5> {this.state.merchant.accountHolderName}</h5>
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

                    {element}

                    <div className="form-row">
                        <div className="col">
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default LoanDetail;