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
    dateExist: false,
    shiftPopupAcc: false,
    shiftPopupPla: false,
    searchShift: false,
    searchShifts: [],
    searchValueShift: '',
    error: "",
};

export const shift = (state = initialState, action) => {
    switch (action.type) {
        case shiftConstants.MODAL_SHIFT:
            return {
                ...state,
                modal: !state.modal,
                startDateExist: false,
                endDateExist: false,
                dateExist: false
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
        case shiftConstants.CHECK_DATE_EXIST:
            let authDateShiftsExist = [...state.authShifts.filter(p => (
                (p.user_id === action.user_id) && (
                    (moment(p.start_date).isBetween(action.start_date, action.end_date)) ||
                    (moment(p.end_date).isBetween(action.start_date, action.end_date))
                )
            ))];
            return {
                ...state,
                dateExist: authDateShiftsExist.length === 0 ? false : true
            }
        case shiftConstants.AUTH_SHIFT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case shiftConstants.AUTH_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                authShifts: action.payload
            };
        case shiftConstants.AUTH_SHIFT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case shiftConstants.FILTER_AUTH_SHIFT:
            return {
                ...state,
                loading: false,
                filterShift: true,
                filterAuthShift: [
                    ...state.authShifts
                        .filter(p => {
                            if (action.statut_shift != '' || action.statut_shift === 0) {
                                return p.statut_shift === parseInt(action.statut_shift);
                            } else {
                                return p;
                            }
                        }).filter(p => {
                            if (action.job_id != '')
                                return p.job_id === parseInt(action.job_id);
                            else
                                return p;
                        })
                        .filter(p => {
                            if (action.start_date != null && action.end_date != null) {
                                const start_date = new Date(action.start_date);
                                const end_date = new Date(action.end_date);
                                if (!isNaN(start_date) && !isNaN(end_date)) {
                                    return ((moment(p.start_date).isBetween(action.start_date, action.end_date)) &&
                                        moment(p.end_date).isBetween(action.start_date, action.end_date));
                                } else if (!isNaN(start_date)) {
                                    let sd = moment(start_date).format("YYYY-MM-DD");
                                    let psd = moment(p.start_date).format("YYYY-MM-DD");
                                    return (moment(psd).isSame(sd));
                                } else if (!isNaN(end_date)) {
                                    let ed = moment(end_date).format("YYYY-MM-DD");
                                    let ped = moment(p.end_date).format("YYYY-MM-DD");
                                    return (moment(ed).isSame(ped));
                                } else
                                    return p;
                            } else {
                                return p;
                            }
                        })]
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
                        if (k.id === p.job_id && k.statut === 0) {
                            p.statut_shift = 2;
                        } else if (k.id === p.job_id && k.statut === 1) {
                            p.statut_shift = k.statut
                        }
                    });
                    return p;
                })]
            };
        case shiftConstants.SEARCH_SHIFT:
            return {
                ...state,
                searchShift: true,
                searchShifts: [...state.authShifts.filter(
                    p => p.name_job.toLowerCase()
                        .includes(action.payload.toLowerCase())
                )],
                searchValueShift: action.payload
            };
        case shiftConstants.CLEAR_SEARCH_SHIFT:
            return {
                ...state,
                searchShift: false,
                searchShifts: [],
                searchValueShift: ''
            }
        default:
            return state;
    }
};
