import axios from 'axios';
// Hola
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export default axiosClient;