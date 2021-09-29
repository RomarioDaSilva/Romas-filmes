import axios from "axios";

export const key = '5a3e5a6fd1aec4ae7c4841afcf93a9f4'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;