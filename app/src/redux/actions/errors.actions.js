import { errorConstants } from "../constants/errors.constants";

export const errorActions = {
    getError
}

function getError (error) {
    return {
        type: errorConstants.ERROR_APP,
        payload: error
    }
}