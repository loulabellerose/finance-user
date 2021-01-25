import React, { Component } from 'react';
import axios from 'axios';

class GetUser extends Component {
    state = {
        currentUser: {
            //_id: '',
            name: '',
            email: '',
            //password: '',
            role: ''
        }
    };

    componentDidMount() {
        this.getCurrentUser();
    }

    getCurrentUser = async () => {
        const token = localStorage.getItem('user-auth-token');
        await axios.get('http://localhost:5000/users/me', {
            headers: {
                'user-auth-token': token
            }
        })
            .then((res) => {
                console.log(res.data)
                this.setState(res.data);
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    //password: res.data.password,
                    role: res.data.role
                })
                localStorage.setItem('role', this.state.role)
            }).catch((error) => {
                console.log(error)
            });
    };

    getRole() {
        console.log(this.currentUser.role);
    }

render()
{    return(
        <div className="wrapper">
            <div className="container">
                <p>{this.state.name}</p>
                <p>{this.state.email}</p>
                <p>{this.state.role}</p>
            </div>
        </div>
    )
}
}

export default GetUser;