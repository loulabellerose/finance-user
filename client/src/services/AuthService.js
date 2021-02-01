export default class AuthService {
    constructor() {
        this.login = this.login.bind(this)
    }

    login(email, password) {
        console.log(email + " " + password);
        return fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            //this.setToken(res.Token)
            localStorage.setItem('user', JSON.stringify(res.data))
            console.log(res.data)
            //localStorage.setItem('user', res.data.user)
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        const user = this.getUser()
        return !!user
    }

    getUser() {
        return localStorage.getItem('user')
    }




}
