import { shiftConstants } from "../constants/shifts.constants";

const initialState = {
    loading: false,
    item: {},
    items: [],
    modal: false,
    error: ""
};

export const shift = (state = initialState, action) => {
    switch (action.type) {
        case shiftConstants.MODAL_SHIFT:
            return {
                ...state,
                modal: !state.modal
            };
        case shiftConstants.ADD_SHIFT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case shiftConstants.ADD_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload]
            };
        case shiftConstants.ADD_SHIFT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case shiftConstants.GETALL_SHIFT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case shiftConstants.GETALL_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };
        case shiftConstants.GETALL_SHIFT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case shiftConstants.UPDATE_SHIFT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case shiftConstants.UPDATE_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [...state.items.map(p => {
                    if (p.id === action.payload.id)
                        p = action.payload;
                    return p;
                })]
            };
        case shiftConstants.UPDATE_SHIFT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}