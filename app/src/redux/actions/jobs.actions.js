import { jobConstants } from "../constants/jobs.constants";
import { jobServices } from "../services/jobs.services";

export const jobActions = {
    getAll,
    modalJob,
    add,
    update,
    updateEmployer
};

function getAll() {
    return function (dispatch) {
        dispatch(request());
        jobServices.getAll()
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => [
                dispatch(failure(err.message))
            ])
    };
    function request() {
        return {
            type: jobConstants.GETALL_JOB_REQIUEST
        }
    };
    function success(job) {
        return {
            type: jobConstants.GETALL_JOB_SUCCESS,
            payload: job
        }
    };
    function failure(error) {
        return {
            type: jobConstants.GETALL_JOB_FAILURE,
            payload: error
        }
    }
}

function add(name_job, color_job, employer_id) {
    return function (dispatch) {
        dispatch(request());
        jobServices.add(name_job, color_job, employer_id)
            .then(res => {
                dispatch(success(res.data));
                dispatch(jobActions.modalJob());
            })
            .catch(err => {
                dispatch(failure(err.message))
            })
    };
    function request() {
        return {
            type: jobConstants.ADD_JOB_REQUEST
        }
    };
    function success(job) {
        return {
            type: jobConstants.ADD_JOB_SUCCESS,
            payload: job
        }
    };
    function failure(error) {
        return {
            type: jobConstants.ADD_JOB_FAILURE,
            payload: error
        }
    };
}

function update(id, name_job, color_job, employer_id) {
    return function (dispatch) {
        dispatch(request());
        jobServices.update(id, name_job, color_job, employer_id)
            .then(res => {
                dispatch(success(res.data));
                dispatch(jobActions.modalJob());
            })
            .catch(err => {
                dispatch(failure(err.message));
            })
    };
    function request() {
        return {
            type: jobConstants.UPDATE_JOB_REQUEST
        }
    };
    function success(job) {
        return {
            type: jobConstants.UPDATE_JOB_SUCCESS,
            payload: job
        }
    };
    function failure(error) {
        return {
            type: jobConstants.UPDATE_JOB_FAILURE,
            payload: error
        }
    };
}

function modalJob() {
    return {
        type: jobConstants.MODAL_JOB
    }
};

function updateEmployer (employer) {
    return {
        type: jobConstants.UPDATE_EMPLOYER_STATE,
        payload: employer
    }
}