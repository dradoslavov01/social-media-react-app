import axios from "axios";


export const login = (data) => {
    axios.post('/login', data);
}

export const register = (data) => {
    axios.post('/register', data);
}
