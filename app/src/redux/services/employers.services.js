import axios from "../../axios";
import store from "../../store";

export const employerServices = {
    getAll,
    add,
    update
}

async function getAll() {
    return await axios.get(`/employers`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    });
}

async function add(name) {
    return await axios.post(`/employers`, { name_emp: name }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    })
}

async function update(id, name) {
    return await axios.put(`/employers/${id}`, { name_emp: name }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    });
}