import axios from "axios";


export const login = (email, password) => {
    const data = {
        email,
        password
    }
    return axios.post('/login', data);
}

export const register = (data) => {
    return axios.post('/register', data);
}
