import axios from "axios";


export const login = (email, password) => {
    const data = {
        email,
        password
    }
    return axios.post('/login', data);
}

export const register = (username, email, password) => {
    const data = {
        username,
        email,
        password
    }
    return axios.post('/register', data);
}
