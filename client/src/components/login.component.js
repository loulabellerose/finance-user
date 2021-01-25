import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.setUserEmail = this.setUserEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

  setUserEmail(e) {
    this.setState({ email: e.target.value })
  }

  setPassword(e) {
    this.setState({ password: e.target.value })
  }

  onSubmit = async (e) => {
    e.preventDefault()

    const loginObject = {
      email: this.state.email,
      password: this.state.password
    };

    await axios.post('http://localhost:5000/login', loginObject)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('user-auth-token', res.data)
        this.props.history.push("/")
      }).catch((error) => {
        console.log(error)
      });

    this.setState({ email: '', password: '' })
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
