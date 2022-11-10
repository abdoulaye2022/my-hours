import { shiftConstants } from "../constants/shifts.constants";
import { shiftServices } from "../services/shifts.services";

export const shiftActions = {
    shiftModal,
    add,
    getAll,
    update
};

function getAll() {
    return function (dispatch) {
        dispatch(request());
        shiftServices.getAll()
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.message))
            })
    }
    function request() {
        return {
            type: shiftConstants.GETALL_SHIFT_REQUEST
        }
    };
    function success(shift) {
        return {
            type: shiftConstants.GETALL_SHIFT_SUCCESS,
            payload: shift
        }
    };
    function failure(error) {
        return {
            type: shiftConstants.GETALL_SHIFT_FAILURE,
            payload: error
        }
    };
}

function add(job_id, start_date, end_date, statut_shift, location, user_id) {
    return function (dispatch) {
        dispatch(request());
        shiftServices.add(job_id, start_date, end_date, statut_shift, location, user_id)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.message))
            })
    }
    function request() {
        return {
            type: shiftConstants.ADD_SHIFT_REQUEST
        }
    };
    function success(shift) {
        return {
            type: shiftConstants.ADD_SHIFT_SUCCESS,
            payload: shift
        }
    };
    function failure(error) {
        return {
            type: shiftConstants.ADD_SHIFT_FAILURE,
            payload: error
        }
    }
}

function update(id, job_id, start_date, end_date, statut_shift, location, user_id) {
    return function (dispatch) {
        dispatch(request());
        shiftActions.update(id, job_id, start_date, end_date, statut_shift, location, user_id)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.message))
            })
    }
    function request() {
        return {
            type: shiftConstants.UPDATE_SHIFT_REQUEST,
        }
    };
    function success(shift) {
        return {
            type: shiftConstants.UPDATE_SHIFT_SUCCESS,
            payload: shift
        }
    };
    function failure(error) {
        return {
            type: shiftConstants.UPDATE_SHIFT_FAILURE,
            payload: error
        };
    }
}

function shiftModal() {
    return {
        type: shiftConstants.MODAL_SHIFT
    }
};