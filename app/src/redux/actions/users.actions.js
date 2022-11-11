import { userConstants } from "../constants/users.constants";
import { userServices } from "../services/users.services";
import { employerActions } from "./employers.actions";
import { jobActions } from "./jobs.actions";
import { shiftActions } from "./shifts.actions";

export const userActions = {
    login,
    logout,
    update
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

function login(email, password, cb, er) {
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
                cb();
            })
            .catch((err) => {
                er("Incorrect email or password.");
                dispatch(failure(err.message));
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