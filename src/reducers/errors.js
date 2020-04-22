import {FETCHED_BOARD_REQUESTED} from "./board";
import produce from "immer";

export const ERROR_MESSAGE = 'ERRORS/ERROR_MESSAGE';
export const ERROR_VALIDATION = 'ERRORS/ERROR_VALIDATION';

export const errorMessageAction = (error) => ({type: ERROR_MESSAGE, payload: error});

const initialState = {
    errorMessage: '',
    errorValidation: ''
};

export default function errors(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case ERROR_MESSAGE:
                draft.errorMessage = action.payload;
                return draft;
            case ERROR_VALIDATION:
                draft.errorValidation = action.payload;
                return draft;
            default:
                return draft;
        }
    });
}