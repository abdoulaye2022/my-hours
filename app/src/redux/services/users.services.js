import axios from "../../axios";

export const userServices = {
    login
}

async function login (email, password) {
    return await axios.post(`/`, { email: email, password: password});
}