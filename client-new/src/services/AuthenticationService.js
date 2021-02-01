import axios from 'axios';

//const currentUser = JSON.parse(localStorage.getItem('user'));

const authenticationService = {
    login,
    logout,
    //user : currentUser
};

function login(email, password) {

    const loginObject = {
        email: email,
        password: password
    };

    async function postLogin() {
        let res = await axios.post('http://localhost:5000/login', loginObject);
        console.log("Post success" + res.data.user);
        localStorage.setItem('user-auth-token', res.data.token);
        const user = res.data.user;

        return user;
    }
    postLogin();
}

function logout() {
    localStorage.removeItem('user');
}

export default authenticationService;
