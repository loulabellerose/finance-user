import React from 'react';

import authenticationService from '../services/AuthenticationService';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.setUserEmail = this.setUserEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        if (authenticationService.currentUser) {
            this.props.history.push('/');
        }

        this.state = {
            email: '',
            password: '',
        }
    }

    setUserEmail(e) {
        this.setState({ email: e.target.value })
    }

    setPassword(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting login attempt for " + this.state.email);
        await authenticationService.login({
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        return (
            <div className="login-wrapper">
                <h1>Please Log In</h1>
                <form onSubmit={this.onSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" value={this.state.email} onChange={this.setUserEmail} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" value={this.state.password} onChange={this.setPassword} />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;