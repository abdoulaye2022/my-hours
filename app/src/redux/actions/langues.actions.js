import { langueConstants, USER_LANGUE } from "../constants/langues.constants";

export const langueActions = {
    changeLangue
}

function changeLangue (langue) {
    return {
        type: langueConstants.USER_LANGUE,
        payload: langue
    }
}