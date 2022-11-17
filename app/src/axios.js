// First we need to import axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    // baseURL: 'https://my-hours.net/api/public/index.php/api',
    timeout: 20000
});

export default instance;