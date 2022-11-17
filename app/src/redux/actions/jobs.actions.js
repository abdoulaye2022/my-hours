import { jobConstants } from "../constants/jobs.constants";
import { jobServices } from "../services/jobs.services";

export const jobActions = {
    getAuthJobs,
    modalJob,
    add,
    update,
    updateEmployer,
    searchJob,
    clearSearchJob
};

function getAuthJobs(id) {
    return function (dispatch) {
        dispatch(request());
        jobServices.getAuthJobs(id)
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

function add(name_job, color_job, employer_id, user_id) {
    return function (dispatch) {
        dispatch(request());
        jobServices.add(name_job, color_job, employer_id, user_id)
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

function searchJob (job) {
    return {
        type: jobConstants.SEARCH_JOB,
        payload: job
    }
}

function clearSearchJob () {
    return {
        type: jobConstants.CLEAR_SERACH_JOB
    }
}