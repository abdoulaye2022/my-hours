import { userConstants } from "../constants/users.constants";
import { userServices } from "../services/users.services";

export const userActions = {
    login
}

function login(email, password, cb) {
    return function (dispatch) {
        dispatch(request());
        userServices.login(email, password)
            .then(res => {
                dispatch(success(res.data));
                window.localStorage.setItem('token', res.data.access_token)
                cb();
            })
            .catch(err => {
                dispatch(failure(err.message));
            })
    }
    function request() {
        return {
            type: userConstants.LOGIN_USER_REQUEST
        }
    };
    function success(user) {
        return {
            type: userConstants.LOGIN_USER_SUCCESS,
            payload: user
        }
    };
    function failure(error) {
        return {
            type: userConstants.LOGIN_USER_FAILURE,
            payload: error
        }
    };
}