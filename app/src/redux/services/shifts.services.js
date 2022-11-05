import axios from "../../axios";
import store from "../../store";

export const shiftServices = {
    add
}

async function add(job_id, hours, date, employer_id, location) {
    return await axios.post(`/shifts`, { job_id: job_id, hours_shift: hours, date_shift : date, employer_id: employer_id, location: location }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`
        }
    });
}