import axios from "../../axios";

export const jobServices = {
    getAll,
    add,
    update
}

async function getAll() {
    return await axios.get(`/jobs`);
}

async function add(name_job, employer_id, color_job) {
    return await axios.post(`/jobs`, { name_job: name_job, employer_id: employer_id, color_job: color_job });
}

async function update (id, name_job, employer_id, color_job) {
    return await axios.put(`/jobs/${id}`, { name_job: name_job, employer_id: employer_id, color_job: color_job });
}