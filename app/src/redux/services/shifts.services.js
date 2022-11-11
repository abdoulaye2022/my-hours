import axios from "../../axios";
import store from "../../store";

export const shiftServices = {
    add,
    getAll,
    update,
    complete,
    authShift
};

async function add(
    job_id,
    start_date,
    end_date,
    statut_shift,
    location,
    user_id
) {
    return await axios.post(
        `/shifts`,
        {
            job_id: job_id,
            start_date: start_date,
            end_date: end_date,
            statut_shift: statut_shift,
            location: location,
            user_id: user_id,
        },
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.getState().user.token}`,
            },
        }
    );
}

async function getAll() {
    return await axios.get(`/shifts`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`,
        },
    });
}

async function update(
    id,
    job_id,
    start_date,
    end_date,
    statut_shift,
    location,
    user_id
) {
    return await axios.put(
        `/shifts/${id}`,
        {
            job_id: job_id,
            start_date: start_date,
            end_date: end_date,
            statut_shift: statut_shift,
            location: location,
            user_id: user_id,
        },
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.getState().user.token}`,
            },
        }
    );
}

async function complete(id, statut_shift) {
    return await axios.put(
        `/shifts/complete/${id}`,
        { statut_shift: statut_shift },
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.getState().user.token}`,
            },
        }
    );
}

async function authShift(user_id) {
    return await axios.get(`/shifts/${user_id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`,
        },
    });
}
