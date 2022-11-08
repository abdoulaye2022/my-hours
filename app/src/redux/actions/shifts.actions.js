import { shiftConstants } from "../constants/shifts.constants";
import { shiftServices } from "../services/shifts.services";

export const shiftActions = {
    shiftModal,
    add
};

function add(job_id, hours, date, employer_id, location) {
    return function (dispatch) {
        dispatch(request());
        shiftServices.add(job_id, hours, date, employer_id, location)
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

function shiftModal() {
    return {
        type: shiftConstants.MODAL_SHIFT
    }
};