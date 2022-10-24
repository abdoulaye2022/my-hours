// First we need to import axios.js
import axios from 'axios';

// Next we make an 'instance' of it
const instance = axios.create({
    // .. where we make our configurations
    baseURL: 'http://localhost:8000/api',
    timeout: 20000,
});

const token = window.localStorage.getItem('token')

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Also add/ configure interceptors && all the other cool stuff

export default instance;