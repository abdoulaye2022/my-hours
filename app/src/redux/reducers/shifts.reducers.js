import { shiftConstants } from "../constants/shifts.constants";
import moment from "moment";
import store from "../../store";

const initialState = {
    loading: false,
    item: {},
    items: [],
    authShifts: [],
    filterAuthShift: [],
    filterShift: false,
    modal: false,
    filterModal: false,
    startDateExist: false,
    endDateExist: false,
    shiftPopupAcc: false,
    shiftPopupPla: false,
    error: "",
};

export const shift = (state = initialState, action) => {
    switch (action.type) {
        case shiftConstants.MODAL_SHIFT:
            return {
                ...state,
                modal: !state.modal,
                startDateExist: false,
                endDateExist: false
            };
        case shiftConstants.ADD_SHIFT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case shiftConstants.ADD_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                authShifts: [action.payload, ...state.authShifts],
            };
        case shiftConstants.ADD_SHIFT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case shiftConstants.GETALL_SHIFT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case shiftConstants.GETALL_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
            };
        case shiftConstants.GETALL_SHIFT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case shiftConstants.UPDATE_SHIFT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case shiftConstants.UPDATE_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                authShifts: [
                    ...state.authShifts.map((p) => {
                        if (p.id === action.payload.id) p = action.payload;
                        return p;
                    }),
                ],
            };
        case shiftConstants.UPDATE_SHIFT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case shiftConstants.COMPLETE_SHIFT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case shiftConstants.COMPLETE_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                authShifts: [
                    ...state.authShifts.map((p) => {
                        if (p.id === action.payload.id) p = action.payload;
                        return p;
                    }),
                ],
            };
        case shiftConstants.COMPLETE_SHIFT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case shiftConstants.CHECK_START_DATE_EXIST:
            let authStartDateShiftsExist = [...state.authShifts.filter(p => (
                (p.user_id === action.user_id) &&
                (moment(action.start_date).isBetween(p.start_date, p.end_date)
                )))];
            return {
                ...state,
                startDateExist: authStartDateShiftsExist.length === 0 ? false : true
            }
        case shiftConstants.CHECK_END_DATE_EXIST:
            let authEndDateShiftsExist = [...state.authShifts.filter(p => (
                (p.user_id === action.user_id) &&
                (moment(action.end_date).isBetween(p.start_date, p.end_date))
            ))];
            return {
                ...state,
                endDateExist: authEndDateShiftsExist.length === 0 ? false : true
            };
        case shiftConstants.AUTH_SHIFT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case shiftConstants.AUTH_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                authShifts: action.payload.sort((a, b) => new Date(a.added_at) - new Date(b.added_at)) 
            };
        case shiftConstants.AUTH_SHIFT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case shiftConstants.FILTER_AUTH_SHIFT:
            // let tab = [];
            // if(action.accomplis === 1) {
            //     tab = [...state.authShifts.filter(p => p.statut_shift === action.accomplis)]
            // }
            // if()
            return {
                ...state,
                loading: false,
                filterShift: true,
                filterAuthShift: action.accomplis === 1 ? (
                    [state.filterAuthShift, ...state.authShifts.filter(p => p.statut_shift === action.accomplis)]
                ) : action.planifier === 0 ? (
                    [state.filterAuthShift, ...state.authShifts.filter(p => p.statut_shift === action.planifier)]
                ) : action.annuler === 2 ? (
                    [state.filterAuthShift, ...state.authShifts.filter(p => p.statut_shift === action.annuler)]
                ) : ((action.start_date !== '') && (action.end_date !== '')) ? (
                    [state.filterAuthShift, ...state.authShifts.filter(p => moment(p.start_date).isBetween(action.start_date, action.end_date))]
                ) : (
                    []
                )
            }
        case shiftConstants.CLEAR_FILTER_SHIFT:
            return {
                ...state,
                filterShift: false,
                filterAuthShift: []
            }
        case shiftConstants.FILTER_MODAL:
            return {
                ...state,
                filterModal: !state.filterModal
            };
        case shiftConstants.FILTER_DROPDOWN:
            return {
                ...state,
                filterDropdown: !state.filterDropdown
            };
        case shiftConstants.SHIFT_POPUP_ACC:
            return {
                ...state,
                shiftPopupAcc: !state.shiftPopupAcc
            };
        case shiftConstants.SHIFT_POPUP_PLA:
            return {
                ...state,
                shiftPopupPla: !state.shiftPopupPla
            };
        case shiftConstants.SHIFT_ITEM:
            return {
                ...state,
                item: action.payload
            };
        case shiftConstants.UPDATE_EMPLOYER_SHIFT:
            return {
                ...state,
                authShifts: [...state.authShifts.map((p, i) => {
                    action.payload.map((k, i) => {
                        if(k.id === p.job_id && k.statut === 0) {
                            console.log("Rendre le statut a 2")
                            p.statut_shift = 2;
                        } else if(k.id === p.job_id && k.statut === 1) {
                            console.log("Rendre le statut actif")
                            p.statut_shift = k.statut
                        }
                    });
                    return p;
                })]
            }
        default:
            return state;
    }
};
