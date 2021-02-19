import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../Constants';
var url = config.url.API_URL;

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = { usersCollection: [] };
    }
    
        componentDidMount() {
            const user = JSON.parse(localStorage["user"]);
            const token = user.token;
            axios({
                method: 'get',
                url: `${url}/users`,
                headers: {token: token }
            })
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
                <td><a href={`/admin/users/${data._id}`}>{data.name}</a></td>
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