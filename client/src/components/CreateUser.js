import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../Constants';
var url = config.url.API_URL;

export default class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password:'',
            role: ''
        };

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onChangeUserRole = this.onChangeUserRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUserName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeUserEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangeUserPassword(e) {
        this.setState({ password: e.target.value })
    }

    onChangeUserRole(e) {
        this.setState({ role: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const user = JSON.parse(localStorage["user"]);
        const token = user.token;
        axios({
            method: 'post',
            url: `${url}/users/new`,
            headers: { token: token },
            data: {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    role: this.state.role
            }
        })
            .then((res) => {
                console.log(res.data)
                alert('New user added');
                this.props.history.push('/admin/users');
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ name: '', email: '', password: '', role: '' });
    }

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Enter Name</label>
                        <input type="text" value={this.state.name} onChange={this.onChangeUserName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Enter Email</label>
                        <input type="text" value={this.state.email} onChange={this.onChangeUserEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Set Password</label>
                        <input type="password" value={this.state.password} onChange={this.onChangeUserPassword} className="form-control" />
                    </div>
                    
                    <div className="form-group">
                        <label>User role</label>
                        <select role={this.state.role} onChange={this.onChangeUserRole} className="form-control btn btn-sm btn-outline-info dropdown-toggle">
                            <option role="">Select User Role</option>
                            <option role="analyst">Analyst</option>
                            <option role="admin">Admin</option>
                        </select>
                    </div>
        
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-secondary btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}