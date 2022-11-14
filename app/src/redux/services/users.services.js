import axios from "../../axios";
import store from "../../store";

export const userServices = {
    login,
    update,
    register
}

async function login(email, password) {
    return await axios.post(`/login`, { email: email, password: password });
}

async function register (firstname, lastname, email, password) {
    return await axios.post(`/register`, { firstname: firstname, lastname: lastname, email: email, password: password });
}

async function update(id, firstname, lastname, gender, country, province, city, bio, password) {
    return await axios.put(`/users/${id}`, { firstname: firstname, lastname: lastname, gender: gender, country: country, province: province, city: city, bio: bio, password: password }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    });
}