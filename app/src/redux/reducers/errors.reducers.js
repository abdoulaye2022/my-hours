import { errorConstants } from "../constants/errors.constants";

const initialState = {
    error: ''
}

export const error = (state = initialState, action) => {
    switch (action.type) {
        case errorConstants.ERROR_APP:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}