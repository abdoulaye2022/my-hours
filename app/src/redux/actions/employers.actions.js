import { employerConstants } from "../constants/employers.constants";
import { employerServices } from "../services/employers.services";
import { jobActions } from "./jobs.actions";

export const employerActions = {
    getAll,
    modalEmployer,
    add,
    update
}

function getAll() {
    return function (dispatch) {
        dispatch(request());
        employerServices.getAll()
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.message))
            })
    };
    function request() {
        return {
            type: employerConstants.GETALL_EMPLOYER_REQUEST
        }
    };
    function success(employer) {
        return {
            type: employerConstants.GETALL_EMPLOYER_SUCCESS,
            payload: employer
        }
    };
    function failure(error) {
        return {
            type: employerConstants.GETALL_EMPLOYER_FAILURE,
            payload: error
        }
    };
}

function modalEmployer() {
    return {
        type: employerConstants.MODAL_EMPLOYER
    }
}

function add(name_emp, statut) {
    return function (dispatch) {
        dispatch(request());
        employerServices.add(name_emp, statut)
            .then(res => {
                dispatch(success(res.data));
                dispatch(modalEmployer());
            })
            .catch(err => {
                dispatch(failure(err.message));
            })
    };
    function request() {
        return {
            type: employerConstants.ADD_EMPLOYER_REQUEST
        }
    };
    function success(employer) {
        return {
            type: employerConstants.ADD_EMPLOYER_SUCCESS,
            payload: employer
        }
    };
    function failure(error) {
        return {
            type: employerConstants.ADD_EMPLOYER_FAILURE,
            payload: error
        }
    };
}

function update(id, name_emp, statut) {
    return function (dispatch) {
        dispatch(request());
        employerServices.update(id, name_emp, statut)
            .then(res => {
                dispatch(success(res.data));
                dispatch(jobActions.updateEmployer(res.data));
                dispatch(modalEmployer());
            })
            .catch(err => {
                dispatch(failure(err.message));
            })
    };
    function request() {
        return {
            type: employerConstants.UPDATE_EMPLOYER_REQUEST
        }
    };
    function success(employer) {
        return {
            type: employerConstants.UPDATE_EMPLOYER_SUCCESS,
            payload: employer
        }
    };
    function failure(error) {
        return {
            type: employerConstants.UPDATE_REQUEST_FAILURE,
            payload: error
        }
    };
}