import { shiftConstants } from "../constants/shifts.constants";

export const shiftAction = {
    modalShift
};

function modalShift () {
    return {
        type: shiftConstants.MODAL_SHIFT
    }
};