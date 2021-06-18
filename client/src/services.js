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

export const uploadPhoto = (data) => {
    return axios.post('/upload', data);
}

export const sendPhoto = (url) => {
    return axios.post('/photos', { url })
}

export const getPhotos = () => {
    return axios.get('/photos')
}

export const deletePhoto = (id) => {
    return axios.post('/deletePhoto', { id })
}


