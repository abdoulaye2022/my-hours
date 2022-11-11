import { shiftConstants } from "../constants/shifts.constants";
import { shiftServices } from "../services/shifts.services";

export const shiftActions = {
    shiftModal,
    add,
    getAll,
    update,
    complete,
    checkStartDateShift,
    checkEndDateShift,
    authShift,
    filterAuthShift,
    clearFilter,
    filterModal,
    filterDropdown
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

function authShift(user_id) {
    return function (dispatch) {
        dispatch(request());
        shiftServices.authShift(user_id)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.message))
            })
    }
    function request() {
        return {
            type: shiftConstants.AUTH_SHIFT_REQUEST
        }
    };
    function success(shift) {
        return {
            type: shiftConstants.AUTH_SHIFT_SUCCESS,
            payload: shift
        }
    };
    function failure(error) {
        return {
            type: shiftConstants.AUTH_SHIFT_FAILURE,
            payload: error
        }
    }
}

function filterAuthShift (accomplis, planifier, annuler, start_date, end_date) {
    return {
        type: shiftConstants.FILTER_AUTH_SHIFT,
        accomplis,
        planifier,
        annuler,
        start_date,
        end_date
    }
}

function shiftModal() {
    return {
        type: shiftConstants.MODAL_SHIFT,
    };
}

function checkStartDateShift(user_id, start_date) {
    return {
        type: shiftConstants.CHECK_START_DATE_EXIST,
        user_id,
        start_date
    }
}

function checkEndDateShift(user_id, end_date) {
    return {
        type: shiftConstants.CHECK_END_DATE_EXIST,
        user_id,
        end_date
    }
}

function clearFilter () {
    return {
        type: shiftConstants.CLEAR_FILTER_SHIFT
    }
}

function filterModal () {
    return {
        type: shiftConstants.FILTER_MODAL
    }
}

function filterDropdown () {
    return {
        type: shiftConstants.FILTER_DROPDOWN
    }
}