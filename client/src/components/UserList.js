import React, { Component } from 'react';
import axios from 'axios';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = { usersCollection: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(res => {
                this.setState({ usersCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getAllUsers() {        
        return this.state.usersCollection.map((data, i) => {
            return <tr>
                <td><a href={`/users/${data._id}`}>{data.name}</a></td>
                <td>{data.email}</td>
                <td>{data.role}</td>
                </tr>;
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>User Role</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getAllUsers()}
                        </tbody>
                    </table>
                </div>
        )
    }
}

export default UserList;