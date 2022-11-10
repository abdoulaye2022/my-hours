import axios from "../../axios";
import store from "../../store";

export const jobServices = {
    getAll,
    add,
    update
}

async function getAll() {
    return await axios.get(`/jobs`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    });
}

async function add(name_job, color_job, employer_id) {
    return await axios.post(`/jobs`, { name_job: name_job, color_job: color_job, employer_id: employer_id }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    });
}

async function update(id, name_job, color_job, employer_id) {
    return await axios.put(`/jobs/${id}`, { name_job: name_job, color_job: color_job, employer_id: employer_id }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    });
}