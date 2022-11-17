import { employerConstants } from "../constants/employers.constants";

const initialState = {
    loading: false,
    item: {},
    items: [],
    modal: false,
    searchEmp: false,
    searchEmployers: [],
    error: ""
};

export const employer = (state = initialState, action) => {
    switch (action.type) {
        case employerConstants.GETALL_EMPLOYER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case employerConstants.GETALL_EMPLOYER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };
        case employerConstants.GETALL_EMPLOYER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case employerConstants.MODAL_EMPLOYER:
            return {
                ...state,
                modal: !state.modal
            };
        case employerConstants.ADD_EMPLOYER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case employerConstants.ADD_EMPLOYER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload]
            };
        case employerConstants.ADD_EMPLOYER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case employerConstants.UPDATE_EMPLOYER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case employerConstants.UPDATE_EMPLOYER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [...state.items.map((p, index) => {
                    if (p.id === action.payload.id)
                        p = action.payload
                    return p;
                })]
            };
        case employerConstants.UPDATE_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case employerConstants.SEARCH_EMPLOYER:
            return {
                ...state,
                searchEmp: true,
                searchEmployers: [...state.items.filter(
                    p => p.name_emp.toLowerCase()
                        .includes(action.payload.toLowerCase())
                )]
            };
        case employerConstants.CLEAR_SEARCH_EMPLOYER:
            return {
                ...state,
                searchEmp: false,
                searchEmployers: []
            };
        default:
            return state;
    }
}