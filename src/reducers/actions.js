import {BOARDS, DICTIONARIES, ERROR_MESSAGE, ERROR_VALIDATION, LOADER, LOGGED} from './types';
import {boardGetRequest} from "../service/board";
import {dictionaryRequest} from "../service/dictionaries";

export const boardsAction = (json) => ({type: BOARDS, payload: json});
export const dictionariescAction = (json) => ({type: DICTIONARIES, payload: json});
export const loaderAction = () => ({type: LOADER});
export const loggedAction = () => ({type: LOGGED});
export const errorMessageAction = (error) => ({type: ERROR_MESSAGE, payload: error});
export const errorValidationAction = () => ({type: ERROR_VALIDATION});

export const boardsAsyncAction = () => ((dispatch) => ((boardGetRequest()
        .then(response => dispatch(boardsAction(response)))
        .catch(error => dispatch(errorMessageAction(error.message)))
        .finally(() => dispatch(loaderAction()))
)));

export const dictionariesAsyncAction = () => ((dispatch) => ((dictionaryRequest()
        .then(response => dispatch(dictionariescAction(response)))
        .catch(error => dispatch(errorMessageAction(error.message)))
        .finally(() => dispatch(loaderAction()))
)));