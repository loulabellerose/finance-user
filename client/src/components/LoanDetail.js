import React, { Component } from 'react';
import axios from 'axios';

class LoanDetail extends Component {

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
        this.setState({statusUpdate: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault()
        
        this.setState({
            status: this.state.statusUpdate
        });

        const statusObject = {
            currentStatus: this.state.statusUpdate
        }

        axios.post(`http://localhost:5000/loans/${this.props.match.params.loanId}`, statusObject)
        .then((res) => {
            console.log(res.data)
            alert(`Loan application status updated to ${statusObject.currentStatus}`)
            //Add a redirect or reload here
        }).catch((error) => {
            console.log(error)
        });        
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
            const arrayLength = loan.loan.status.length;
            return (
                <div className="wrapper-users">
                    <div className="container loan-detail">
                        <h5>Business Name: {this.state.business.businessName} </h5>
                        <h5>Loan application value: £{loan.loan.amount} </h5>
                        <h5>Loan application value: {loan.loan.status[arrayLength-1].currentStatus} </h5>

                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Update status:
                        <select statusUpdate={this.state.statusUpdate} onChange={this.handleChange}>
                                    <option statusUpdate="pending">Pending</option>
                                    <option statusUpdate="forwarded">Forwarded</option>
                                    <option statusUpdate="approved">Approved</option>
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