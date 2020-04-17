import {ERROR_MESSAGE, ERROR_VALIDATION} from "./types";

let inititalState = {
    errorMessage: '',
    errorValidation: ''
};

export default function errorsReducer(state = inititalState, action) {
    if (action.type === ERROR_MESSAGE) {
        return {
            ...state,
            errorMessage: action.payload
        };
    }
    if (action.type === ERROR_VALIDATION) {
        return {
            ...state,
            errorValidation: action.payload
        };
    }
    return state;
}