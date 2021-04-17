import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../Constants';
var url = config.url.API_URL;

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {

            }
        };

        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage["user"]);
        const token = user.token;
        await axios({
            method: 'get',
            url: `${url}/users/${this.props.match.params.userId}`,
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

    handleClick() {
        const user = JSON.parse(localStorage["user"]);
        const token = user.token;
        axios({
            method: 'delete',
            url: `${url}/users/${this.state.user._id}`,
            headers: { token: token },
        })
            .then((res) => {
                alert('User deleted');
                this.props.history.push('/admin/users');
            }).catch((error) => {
                console.log(error)
            });
    }

    render() {
        return (
            <div className="wrapper">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"></div>
                <div className="form-row">
                    <div class="col">
                        <label>Name:</label>
                        <h5>{this.state.user.name}</h5>
                    </div>

                    <div class="col">
                        <label>Email:</label>
                        <h5>{this.state.user.email}</h5>
                    </div>
                </div>

                <div className="form-row">
                    <div class="col">
                        <label>Role:</label>
                        <h5>{this.state.user.role}</h5>
                    </div>

                    <div class="col">
                        <label>Account Status:</label>
                        <p>
                        <button type="button" class="btn btn-danger" onClick={this.handleClick}>
                            Delete User
                            </button>
                        </p>
                    </div>
                </div>
            </div >

        )
    }
}

export default UserDetail;