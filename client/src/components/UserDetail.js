import React, { Component } from 'react';
import axios from 'axios';

class UserDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {

            }
        };
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage["user"]);
        const token = user.token;
        await axios({
            method: 'get',
            url: `http://localhost:5000/users/${this.props.match.params.userId}`,
            headers: { token: token }
        })
            .then(res => {
                this.setState({ user: res.data });
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Role</td>
                                <td>Account Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{this.state.user.name}</td>
                            <td>{this.state.user.email}</td>
                            <td>{this.state.user.role}</td>
                            <td>
                    {/* Add functionality here */}
                            <button type="button" class="btn btn-danger">Delete User</button>
                            </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default UserDetail;