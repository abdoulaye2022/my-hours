import axios from "../../axios";

export const employerServices = {
    getAll,
    add,
    update
}

async function getAll() {
    return await axios.get(`/employers`);
}

async function add(name) {
    return await axios.post(`/employers`, { name_emp: name })
}

async function update(id, name) {
    return await axios.put(`/employers/${id}`, { name_emp: name });
}