import axios from "axios";

export function login (email, password) {
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

export function logout (){
    localStorage.removeItem("token");
};