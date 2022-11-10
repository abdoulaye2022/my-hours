import { shiftConstants } from "../constants/shifts.constants";
import { shiftServices } from "../services/shifts.services";

export const shiftActions = {
    shiftModal,
    add,
    getAll,
    update,
    complete,
};

function getAll() {
    return function (dispatch) {
        dispatch(request());
        shiftServices
            .getAll()
            .then((res) => {
                dispatch(success(res.data));
            })
            .catch((err) => {
                dispatch(failure(err.message));
            });
    };
    function request() {
        return {
            type: shiftConstants.GETALL_SHIFT_REQUEST,
        };
    }
    function success(shift) {
        return {
            type: shiftConstants.GETALL_SHIFT_SUCCESS,
            payload: shift,
        };
    }
    function failure(error) {
        return {
            type: shiftConstants.GETALL_SHIFT_FAILURE,
            payload: error,
        };
    }
}

function add(job_id, start_date, end_date, statut_shift, location, user_id) {
    return function (dispatch) {
        dispatch(request());
        shiftServices
            .add(job_id, start_date, end_date, statut_shift, location, user_id)
            .then((res) => {
                dispatch(success(res.data));
            })
            .catch((err) => {
                dispatch(failure(err.message));
            });
    };
    function request() {
        return {
            type: shiftConstants.ADD_SHIFT_REQUEST,
        };
    }
    function success(shift) {
        return {
            type: shiftConstants.ADD_SHIFT_SUCCESS,
            payload: shift,
        };
    }
    function failure(error) {
        return {
            type: shiftConstants.ADD_SHIFT_FAILURE,
            payload: error,
        };
    }
}

function update(
    id,
    job_id,
    start_date,
    end_date,
    statut_shift,
    location,
    user_id
) {
    return function (dispatch) {
        dispatch(request());
        shiftServices
            .update(
                id,
                job_id,
                start_date,
                end_date,
                statut_shift,
                location,
                user_id
            )
            .then((res) => {
                dispatch(success(res.data));
            })
            .catch((err) => {
                dispatch(failure(err.message));
            });
    };
    function request() {
        return {
            type: shiftConstants.UPDATE_SHIFT_REQUEST,
        };
    }
    function success(shift) {
        return {
            type: shiftConstants.UPDATE_SHIFT_SUCCESS,
            payload: shift,
        };
    }
    function failure(error) {
        return {
            type: shiftConstants.UPDATE_SHIFT_FAILURE,
            payload: error,
        };
    }
}

function complete(id, statut_shift) {
    return function (dispatch) {
        dispatch(request());
        shiftServices
            .complete(id, statut_shift)
            .then((res) => {
                dispatch(success(res.data));
            })
            .catch((err) => {
                dispatch(failure(err.message));
            });
    };
    function request() {
        return {
            type: shiftConstants.COMPLETE_SHIFT_REQUEST,
        };
    }
    function success(shift) {
        return {
            type: shiftConstants.COMPLETE_SHIFT_SUCCESS,
            payload: shift,
        };
    }
    function failure(error) {
        return {
            type: shiftConstants.COMPLETE_SHIFT_FAILURE,
            payload: error,
        };
    }
}

function shiftModal() {
    return {
        type: shiftConstants.MODAL_SHIFT,
    };
}
