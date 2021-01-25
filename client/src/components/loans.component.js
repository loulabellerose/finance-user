import React, { Component } from 'react';
import axios from 'axios';

class Loans extends Component {

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
                <td><a href={`/${data._id}`}>{data._id}</a></td>
                <td>{data.merchantId}</td>
                <td>{data.documents}</td>
                </tr>;
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>MerchantID</td>
                                <td>Documents</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getAllLoans()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Loans;