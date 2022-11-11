import axios from "../../axios";
import store from "../../store";

export const employerServices = {
    getAuthEmployers,
    add,
    update
}

async function getAuthEmployers(id) {
    return await axios.get(`/employers/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    });
}

async function add(name_emp, statut, user_id) {
    return await axios.post(`/employers`, { name_emp: name_emp, statut: statut, user_id: user_id }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    })
}

async function update(id, name_emp, statut) {
    return await axios.put(`/employers/${id}`, { name_emp: name_emp, statut: statut }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    });
}