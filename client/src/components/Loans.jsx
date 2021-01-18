import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './DataTable';

class Loans extends Component {

    constructor(props) {
        super(props);
        this.state = { loansCollection: [] };
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
                            {/*<tr>
                                <td>Name</td>
                                <td>Email</td>
                            </tr>*/}
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

export default Loans;