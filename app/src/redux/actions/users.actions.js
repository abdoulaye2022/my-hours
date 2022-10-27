import { userConstants } from "../constants/users.constants";
import { userServices } from "../services/users.services";
import { employerActions } from "./employers.actions";

export const userActions = {
    login,
    logout,
};

function login(email, password, cb, er) {
    return function (dispatch) {
        dispatch(request());
        userServices
            .login(email, password)
            .then((res) => {
                if (res.data.access_token !== "") {
                    window.localStorage.setItem("token", res.data.access_token);
                    dispatch(success(res.data));
                    dispatch(employerActions.getAll());
                    cb();
                }
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
