import axios from "axios";

const login = (email, password) => {
    return axios
        .post('http://localhost:4000/getAuthToken', {
            email,
            password,
        })
        .then((response) => {
            const token = response.data.authentication_token.token;
            localStorage.setItem('token', token);
        });


};

const logout = () => {
    localStorage.removeItem("token");
};

const AuthService = {
    login,
    logout
};

export default AuthService;