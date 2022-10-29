// First we need to import axios.js
import axios from 'axios';

// Next we make an 'instance' of it
const instance = axios.create({
    // .. where we make our configurations
    baseURL: 'http://localhost:8000/api',
    timeout: 20000,
    //headers: { Authorization: `${token}` }
});
let token = "";

if(window.localStorage.getItem('token')) {
    token = window.localStorage.getItem('token');
}


// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = `bearer ${token}`;
// instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.Authorization = `bearer ${token}`

// Also add/ configure interceptors && all the other cool stuff

export default instance;