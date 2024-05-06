import axios from "axios";
import { baseUrl } from "../api/api";

const api = axios.create({
    baseURL: baseUrl,
    timeout: 8000,
    headers: {
        "Content-Type" : "application/json",
    }
});

// Request middleware
api.interceptors.request.use(
    function (config) {
        const authToken = localStorage.getItem('token');
        const accessToken = JSON.parse(authToken);
        if (accessToken){
            config.headers.Authorization = `Bearer ${accessToken.access}`;
        }
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
);


// Responce middleware

api.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response && error.response.status === 401)
            localStorage.removeItem('token');
            location.assign("/")

        return Promise.reject(error)
    }
)

export {api};