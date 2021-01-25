import React, { Component } from 'react';
import axios from 'axios';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {

            }
        };
    }

    async componentDidMount() {
        await axios.get(`http://localhost:5000/users/${this.props.match.params.userId}`)
            .then(res => {
                this.setState({ user: res.data });
                //console.log(res.data);
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
                                <td>User ID</td>
                                <td>Email</td>
                            </tr>
                        </thead>
                        <tbody>
                            {/*<td>{this.state.user.name}</td>
                            <td>{this.state.user._id}</td>
                            <td>{this.props.match.params.id}</td>
                            <td>{this.state.user.email}</td>*/}
                            <tr>
                            <td>{this.props.match.params.userId}</td>
                            <td>{this.state.user.name}</td>
                            <td>{this.state.user.email}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default User;