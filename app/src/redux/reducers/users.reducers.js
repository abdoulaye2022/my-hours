import { userConstants } from "../constants/users.constants";
import moment from "moment";

const initialState = {
    loading: false,
    authenticathed: false,
    user: {},
    items: [],
    filterModal: false,
    filterDropdown: false,
    filterUsers: false,
    filteredUsers: [],
    searchUsers: false,
    searchedUsers: [],
    searchedValueUsers: "",
    welcomeModal: false,
    resetPassword: false,
    createdAccount: '',
    token: "",
    error: "",
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.access_token,
                user: action.payload.user,
                authenticathed: true,
                error: "",
            };
        case userConstants.LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                createdAccount: ''
            };
        case userConstants.REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case userConstants.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        // case userConstants.GETALL_USER_REQUEST:
        //     return {
        //         ...state,
        //         loading: true
        //     };
        // case userConstants.GETALL_USER_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         items: action.payload
        //     };
        // case userConstants.GETALL_USER_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.payload
        //     };
        case userConstants.UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [
                    ...state.items.map((p, i) => {
                        if (p.id === action.payload.id) {
                            p = action.payload;
                        }
                        return p;
                    }),
                ],
                item: action.payload,
            };
        case userConstants.UPDATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case userConstants.UPDATE_AUTH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.UPDATE_AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case userConstants.UPDATE_AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case userConstants.LOGOUT_USER:
            return {
                ...state,
                loading: false,
                authenticathed: false,
                user: {},
                items: [],
                token: "",
                error: "",
            };
        case userConstants.ACTUALISE_LOGIN_PAGE:
            return {
                ...state,
                loading: false,
                authenticathed: false,
                user: {},
                items: [],
                token: "",
                error: "",
            };
        case userConstants.GETALL_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.GETALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
            };
        case userConstants.GETALL_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case userConstants.FILTER_MODAL:
            return {
                ...state,
                filterModal: !state.filterModal,
            };
        case userConstants.FILTER_DROPDOWN:
            return {
                ...state,
                filterDropdown: !state.filterDropdown,
            };
        case userConstants.FILTER_USERS:
            console.log("Is admin : " + action.is_admin);
            console.log("Statut : " + action.statut);
            return {
                ...state,
                filterUsers: true,
                filteredUsers: [
                    ...state.items
                        .filter((p) => {
                            if (
                                action.is_admin !== "" &&
                                action.is_admin !== null
                            ) {
                                if (action.is_admin === 1)
                                    return p.is_admin === 1;
                                else if (p.is_admin === 0)
                                    return p.is_admin === 0;
                            } else {
                                return p;
                            }
                        })
                        .filter((p) => {
                            if (
                                action.statut !== "" &&
                                action.statut !== null
                            ) {
                                if (action.statut === 1) return p.statut === 1;
                                else if (action.statut === 0)
                                    return p.statut === 0;
                            } else {
                                return p;
                            }
                        })
                        .filter((p) => {
                            if (
                                action.country !== "" &&
                                action.country !== null
                            ) {
                                return p.country === action.country;
                            } else {
                                return p;
                            }
                        })
                        .filter((p) => {
                            if (
                                action.province !== "" &&
                                action.province !== null
                            ) {
                                return p.province === action.province;
                            } else {
                                return p;
                            }
                        })
                        .filter((p) => {
                            if (action.city !== "" && action.city !== null) {
                                return p.city === action.city;
                            } else {
                                return p;
                            }
                        })
                        .filter((p) => {
                            if (
                                action.date_connexion !== "" &&
                                action.date_connexion !== null
                            ) {
                                let p_date = moment(p.date_connexion).format(
                                    "YYYY-MM-DD"
                                );
                                let a_date = moment(
                                    action.date_connexion
                                ).format("YYYY-MM-DD");
                                return moment(a_date).isSame(p_date);
                            } else {
                                return p;
                            }
                        }),
                ],
            };
        case userConstants.CLEAR_FILTER_USERS:
            return {
                ...state,
                filterUsers: false,
                filteredUsers: [],
            };
        case userConstants.SEARCH_USERS:
            return {
                ...state,
                searchUsers: true,
                searchedUsers: [
                    ...state.items.filter((p) => {
                        return (
                            p.firstname
                                .toLowerCase()
                                .includes(action.payload.toLowerCase()) ||
                            p.lastname
                                .toLowerCase()
                                .includes(action.payload.toLowerCase())
                        );
                    }),
                ],
                searchedValueUsers: action.payload,
            };
        case userConstants.CLEAR_SEARCH_USERS:
            return {
                ...state,
                searchUsers: false,
                searchedUsers: [],
                searchedValueUsers: "",
            };
        case userConstants.STATUT_USER_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.STATUT_USER_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [
                    ...state.items.map((p) => {
                        if (p.id === parseInt(action.payload.id)) {
                            p.statut = action.payload.statut;
                        }
                        return p;
                    }),
                ],
            };
        case userConstants.STATUT_USER_ACCOUNT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case userConstants.VERIFY_USER_EMAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.VERIFY_USER_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                createdAccount: action.payload,
            }
        case userConstants.VERIFY_USER_EMAIL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case userConstants.WELCOME_MODAL:
            return {
                ...state,
                welcomeModal: true
            };
        case userConstants.CLOSE_WELCOME_MODAL:
            return {
                ...state,
                welcomeModal: false
            };
        case userConstants.RESET_USER_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.RSEST_USER_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                resetPassword: true,
                access_token: action.payload
            };
        case userConstants.RESET_USER_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case userConstants.VERIFY_RESET_USER_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.VERIFY_RESET_USER_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                resetPassword: true
            };
        case userConstants.VERIFY_RESET_USER_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case userConstants.NEW_PASSWORD_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.NEW_PASSWORD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                resetPassword: false,
                createdAccount: action.payload
            };
        case userConstants.NEW_PASSWORD_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};
