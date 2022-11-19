import { userConstants } from "../constants/users.constants";
import { userServices } from "../services/users.services";
import { employerActions } from "./employers.actions";
import { jobActions } from "./jobs.actions";
import { shiftActions } from "./shifts.actions";

export const userActions = {
    login,
    register,
    logout,
    getAll,
    update,
    actualiseLoginPage,
    filterModal,
    filterDropdown,
    filterUsers,
    clearFilterUsers,
    searchUsers,
    clearSearchUsers
};

function update(id, firstname, lastname, gender, country, province, city, bio, password) {
    return function (dispatch) {
        dispatch(request());
        userServices.update(id, firstname, lastname, gender, country, province, city, bio, password)
            .then(res => {
                dispatch(success(res.data))
            })
            .catch(err => {
                dispatch(failure(err.message))
            })
    }
    function request() {
        return {
            type: userConstants.UPDATE_AUTH_REQUEST
        }
    };
    function success(user) {
        return {
            type: userConstants.UPDATE_AUTH_SUCCESS,
            payload: user
        }
    };
    function failure(error) {
        return {
            type: userConstants.UPDATE_AUTH_FAILURE,
            payload: error
        }
    }
}

function login(email, password, cb1, cb2, currentDate) {
    return function (dispatch) {
        dispatch(request());
        userServices
            .login(email, password, currentDate)
            .then((res) => {
                dispatch(success(res.data));
                if (parseInt(res.data.user.is_admin) === 1) {
                    dispatch(shiftActions.getAll());
                    dispatch(userActions.getAll());
                    cb2();
                } else if (parseInt(res.data.user.is_admin) === 0) {
                    dispatch(employerActions.getAuthEmployers(res.data.user.id));
                    dispatch(jobActions.getAuthJobs(res.data.user.id));
                    dispatch(shiftActions.authShift(res.data.user.id));
                    cb1();
                }
            })
            .catch((err) => {
                dispatch(failure(err.response.data.message));
            });
    };
    function request() {
        return {
            type: userConstants.LOGIN_USER_REQUEST,
        };
    }
    function success(user) {
        return {
            type: userConstants.LOGIN_USER_SUCCESS,
            payload: user,
        };
    }
    function failure(error) {
        return {
            type: userConstants.LOGIN_USER_FAILURE,
            payload: error,
        };
    }
}

function logout(cb) {
    window.localStorage.clear();
    cb();
    return {
        type: userConstants.LOGOUT_USER,
    };
}

function getAll() {
    return function (dispatch) {
        dispatch(request());
        userServices.getAll()
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.message));
            })
    }
    function request() {
        return {
            type: userConstants.GETALL_USER_REQUEST
        }
    };
    function success(user) {
        return {
            type: userConstants.GETALL_USER_SUCCESS,
            payload: user
        }
    };
    function failure(error) {
        return {
            type: userConstants.GETALL_USER_FAILURE,
            payload: error
        }
    }
}

function register(firstname, lastname, email, password, cb, currentDate) {
    return function (dispatch) {
        dispatch(request());
        userServices.register(firstname, lastname, email, password, currentDate)
            .then(res => {
                dispatch(success(res.data));
                dispatch(employerActions.getAuthEmployers(res.data.user.id));
                dispatch(jobActions.getAuthJobs(res.data.user.id));
                dispatch(shiftActions.getAll());
                dispatch(shiftActions.authShift(res.data.user.id));
                cb();
            })
            .catch(err => [
                dispatch(failure(err.message))
            ])
    };
    function request() {
        return {
            type: userConstants.REGISTER_USER_REQUEST
        }
    };
    function success(user) {
        return {
            type: userConstants.REGISTER_USER_SUCCESS,
            payload: user
        }
    };
    function failure(error) {
        return {
            type: userConstants.REGISTER_USER_FAILURE,
            payload: error
        }
    }
}

function actualiseLoginPage() {
    return {
        type: userConstants.ACTUALISE_LOGIN_PAGE
    }
}

function filterModal() {
    return {
        type: userConstants.FILTER_MODAL
    }
}

function filterDropdown () {
    return {
        type: userConstants.FILTER_DROPDOWN
    }
}

function filterUsers (is_admin, statut, country, province, city, date_connexion) {
    return {
        type: userConstants.FILTER_USERS,
        is_admin,
        statut,
        country,
        province, 
        city,
        date_connexion
    }
}

function clearFilterUsers () {
    return {
        type: userConstants.CLEAR_FILTER_USERS
    }
}

function searchUsers (user) {
    return {
        type: userConstants.SEARCH_USERS,
        payload: user
    }
}

function clearSearchUsers () {
    return {
        type: userConstants.CLEAR_SEARCH_USERS
    }
}