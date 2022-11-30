import { langueConstants, USER_LANGUE } from "../constants/langues.constants";

const initialState = {
    lang: ''
}

export const langue = (state = initialState, action) => {
    switch(action.type) {
        case langueConstants.USER_LANGUE:
            return {
                ...state,
                lang: action.payload
            };
        default:
            return state;
    }
}