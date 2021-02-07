import React, { Component } from 'react';
import axios from 'axios';

class LoanDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            business: {
            },
            isLoaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert("Loan application status updated");
        //ADD CODE HERE
    }

    async componentDidMount() {
        await axios.get(`http://localhost:5000/business/${this.props.match.params.loanId}`)
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
            console.log(loan);

            return (
                <div className="wrapper-users">
                    <div className="container loan-detail">
                        <h5>Business Name: {this.state.business.businessName} </h5>
                        <h5>Loan application value: £{loan.loan.amount} </h5>
                        <h5>Loan application value: {loan.loan.status[0].currentStatus} </h5>

                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Update status:
                        <select value={this.state.value} onChange={this.handleChange}>
                                    <option value="pending">Pending</option>
                                    <option value="forwarded">Forwarded</option>
                                    <option value="approved">Approved</option>
                                </select>
                            </label>
                            <input type="submit" value="Update" />
                        </form>

                        <h5>Gross Monthly Sales: £{this.state.business.grossMonthlySales}</h5>
                        <h5>Average Transaction Value: £{this.state.business.averageTransactionValue}</h5>
                    </div>
                </div>
            )
        }
    }
}

export default LoanDetail;