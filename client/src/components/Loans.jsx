import React from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import Loan from './Loan';
import DataTable from './DataTable';

const Loans = ({ match }) => {
    const loanData = [
        fetch('http://localhost:5000/loans')
        .then(data => data.json())
    ];

    const { url } = useRouteMatch();

    const linkList = loanData.map((loan) => {
        return (


            {/*
            <li key={loan._id}>
                <Link to={`${url}/${loan._id}`}>{loan._id}</Link>
            </li>
            */}
        );
    });

    return (
        <div>
            <div className="wrapper-users">
                <div className="container">
                <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <h3>Loans</h3>
                        </thead>
                        <tbody>
                            {linkList}
                        </tbody>
                    </table>
                </div>
            </div>

            <Route path={`${url}/:loanId`}>
                <Loan data={loanData} />
            </Route>
            <Route exact path={url}>
                <p> Please select a loan</p>
            </Route>
        </div>
    );
};

export default Loans;

/*
import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './DataTable';

class Loans extends Component {

    constructor(props) {
        super(props);
        this.state = { loansCollection: [

        ] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/loans')
            .then(res => {
                this.setState({ loansCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    dataTable() {
        return this.state.loansCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>MerchantId</td>
                                <td>Amount</td>
                                <td>Status</td>
                                <td>Documents</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
<Route path={`${url}/:loanId`}>
<Loan data={loanData} />
</Route>

export default Loans;
*/