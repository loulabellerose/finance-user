import React, { Component } from 'react';
import { config } from '../Constants';
import Header from './Header';
import './Login.css';
var url = config.url.API_URL;

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });

  }
  onSubmit = (event) => {
    event.preventDefault();
    fetch(`${url}/login`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async res => {
        if (res.status === 200) {
          let currentUser = await res.text();
          localStorage.setItem('user', currentUser);
          let parsed = JSON.parse(currentUser);
          if (parsed.role === "Admin") {
            this.props.history.push('/admin');
          }
          else {
            this.props.history.push('/dashboard');
          }
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  }

  render() {
    return (
      <div className="App">
        <div class="container">
          <Header />
          <div className="row justify-content-center">

            
              <form onSubmit={this.onSubmit}>
              <div class="login-container">

                <h1>Login Below</h1>
                </div>
                <div className="row">
                <div class="col">
                <div class="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
                </div>
                </div>
                </div>
                <div className="row">
                <div class="col">
                <div class="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                </div>
                </div>
                </div>
                <div className="row">
                <div class="col">
                <input type="submit" value="Submit" />
                </div>
                </div>
              </form>

            
          </div>
        </div>
      </div>

    );
  }
}