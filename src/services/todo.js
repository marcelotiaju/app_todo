import axios from 'axios';

const todoapi = axios.create({
    baseURL: 'http://localhost:3333'
});

export default todoapi;