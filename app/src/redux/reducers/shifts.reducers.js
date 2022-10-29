import { shiftConstants } from "../constants/shifts.constants";

const initialState = {
    loading: false,
    item: {},
    items: [],
    modal: false,
    error: ""
};

export const shift = (state = initialState, action) => {
    switch(action.type) {
        case shiftConstants.MODAL_SHIFT:
            return {
                ...state,
                modal: !state.modal
            };
        default:
            return state;
    }
}