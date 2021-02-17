import React, { Component } from 'react';
import axios from 'axios';

class LoanDetailAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            business: {
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
        /*
                const statusObject = {
                    currentStatus: this.state.statusUpdate
                }
        */
        const user = JSON.parse(localStorage["user"]);
        const token = user.token;

        axios({
            method: 'post',
            url: `http://localhost:5000/loans/${this.props.match.params.loanId}`,
            headers: { token: token },
            data: {
                currentStatus: this.state.statusUpdate
            }
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
            url: `http://localhost:5000/business/${this.props.match.params.loanId}`,
            headers: { token: token }
        })
            .then(res => {
                this.setState({ business: res.data, isLoaded: true })
                //console.log(res.data);
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
            return (
                <div className="wrapper">
                    <div className="form-row">
                        <div class="col">
                            <label>Business Name: </label>
                            <h5>{this.state.business.businessName}</h5>
                        </div>

                        <div class="col">
                            <label>Loan application value:</label>
                            <h5>£{loan.loan.amount} </h5>
                        </div>
                    </div>

                    <div className="form-row">
                        <div class="col">
                            <label>Current status:</label>
                            <h5>{loan.loan.status[arrayLength - 1].currentStatus} </h5>
                        </div>


                        <div class="col">
                            <form onSubmit={this.handleSubmit}>
                                <label>Update status:</label>
                                <p>
                                <select statusUpdate={this.state.statusUpdate} onChange={this.handleChange}>
                                    <option statusUpdate="pending">Pending</option>
                                    <option statusUpdate="forwarded">Forwarded</option>
                                    <option statusUpdate="approved">Approved</option>
                                </select>
                                <input type="submit" value="Update" />
                                </p>
                            </form>
                        </div>
                    </div>

                    <div className="form-row">
                        <div class="col">
                            <label>Gross Monthly Sales:</label>
                            <h5> £{this.state.business.grossMonthlySales}</h5>
                        </div>

                        <div class="col">
                            <label>Average Transaction Value:</label>
                            <h5> £{this.state.business.averageTransactionValue}</h5>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default LoanDetailAdmin;