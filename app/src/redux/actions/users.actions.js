import { userConstants } from "../constants/users.constants";
import { userServices } from "../services/users.services";
import { employerActions } from "./employers.actions";
import { jobActions } from "./jobs.actions";
import { shiftActions } from "./shifts.actions";

export const userActions = {
    login,
    register,
    logout,
    update,
    actualiseLoginPage
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

function login(email, password, cb1, cb2) {
    return function (dispatch) {
        dispatch(request());
        userServices
            .login(email, password)
            .then((res) => {
                dispatch(success(res.data));
                dispatch(employerActions.getAuthEmployers(res.data.user.id));
                dispatch(jobActions.getAuthJobs(res.data.user.id));
                dispatch(shiftActions.getAll());
                dispatch(shiftActions.authShift(res.data.user.id));
                if(parseInt(res.data.user.is_admin) === 1)
                    cb2();
                else if(parseInt(res.data.user.is_admin) === 0)
                    cb1();
               
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

function register(firstname, lastname, email, password, cb) {
    return function (dispatch) {
        dispatch(request());
        userServices.register(firstname, lastname, email, password)
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

function actualiseLoginPage () {
    return {
        type: userConstants.ACTUALISE_LOGIN_PAGE
    }
}