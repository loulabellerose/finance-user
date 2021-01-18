import React, { Component } from 'react';
import axios from 'axios';

export default class UserRegistration extends Component {

    constructor(props) {
        super(props)

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onChangeUserIsAdmin = this.onChangeUserIsAdmin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            isAdmin: ''
        }
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

    onChangeUserIsAdmin(e) {
        this.setState({ isAdmin: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            isAdmin: this.state.isAdmin
        };

        axios.post('http://localhost:5000/users/new', userObject)
            .then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ name: '', email: '' , password: '', isAdmin: ''})
    }


    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={this.state.name} onChange={this.onChangeUserName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" value={this.state.email} onChange={this.onChangeUserEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" value={this.state.password} onChange={this.onChangeUserPassword} className="form-control" />
                    </div>
                    
                    <div className="form-group">
                        <label>Is Admin User?</label>
                        <input type="text" value={this.state.isAdmin} onChange={this.onChangeUserIsAdmin} className="form-control" />

{/*
                        <select isAdmin={this.state.isAdmin} onChange={this.onChangeUserIsAdmin}>
                            <option isAdmin={false}>Analyst User</option>
                            <option isAdmin={true}>Admin User</option>
                        </select>  
*/}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}