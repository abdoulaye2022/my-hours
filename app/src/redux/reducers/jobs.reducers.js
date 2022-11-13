import { jobConstants } from "../constants/jobs.constants";

const initialState = {
    loading: false,
    item: {},
    items: [],
    modal: false,
    error: ""
};

export const job = (state = initialState, action) => {
    switch (action.type) {
        case jobConstants.GETALL_JOB_REQIUEST:
            return {
                ...state,
                loading: true
            };
        case jobConstants.GETALL_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };
        case jobConstants.GETALL_JOB_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case jobConstants.MODAL_JOB:
            return {
                ...state,
                modal: !state.modal
            };
        case jobConstants.ADD_JOB_REQUEST:
            return {
                ...state,
                loading: true
            };
        case jobConstants.ADD_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload]
            };
        case jobConstants.ADD_JOB_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case jobConstants.UPDATE_JOB_REQUEST:
            return {
                ...state,
                loading: true
            };
        case jobConstants.UPDATE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [...state.items.map((p, indxe) => {
                    if (p.id === action.payload.id)
                        p = action.payload;

                    return p;
                })]
            };
        case jobConstants.UPDATE_JOB_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case jobConstants.UPDATE_EMPLOYER_STATE:
            return {
                ...state,
                items: [...state.items.map((p, i) => {
                    if (p.employer_id === action.payload.id) {
                        p.name_emp = action.payload.name_emp;
                        p.statut = action.payload.statut;
                    }
                    return p;
                })]
            };
        default:
            return state;
    }
}