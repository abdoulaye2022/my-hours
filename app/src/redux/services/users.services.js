import axios from "../../axios";
import store from "../../store";

export const userServices = {
    login,
    update,
    register,
    getAll,
    statutUserAccount,
    verifyUserEmail,
    resetUserPassword
};

async function login(email, password, currentDate) {
    return await axios.post(`/login`, {
        email: email,
        password: password,
        currentDate: currentDate,
    });
}

async function register(firstname, lastname, email, password, currentDate) {
    return await axios.post(`/register`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        currentDate: currentDate,
    });
}

async function update(
    id,
    firstname,
    lastname,
    gender,
    country,
    province,
    city,
    bio,
    password
) {
    return await axios.put(
        `/users/${id}`,
        {
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            country: country,
            province: province,
            city: city,
            bio: bio,
            password: password,
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
    return await axios.get(`/users`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().user.token}`,
        },
    });
}

async function statutUserAccount(id, statut) {
    return await axios.put(
        `users/statut/${id}`,
        { statut: statut },
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.getState().user.token}`,
            },
        }
    );
}

async function verifyUserEmail(token) {
    return await axios.get(`users/verifyemail`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
}

async function resetUserPassword(email) {
    return await axios.post(`users/resetpassword`, { email: email });
}