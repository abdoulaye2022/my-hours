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

async function add(name_job, employer_id, color_job) {
    return await axios.post(`/jobs`, { name_job: name_job, employer_id: employer_id, color_job: color_job }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    });
}

async function update(id, name_job, employer_id, color_job) {
    return await axios.put(`/jobs/${id}`, { name_job: name_job, employer_id: employer_id, color_job: color_job }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    });
}