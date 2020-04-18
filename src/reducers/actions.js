import {BOARDS, CATEGORIES, ERROR_MESSAGE, ERROR_VALIDATION, ICONS, LOADER, LOGGED} from './types';
import {boardGetRequest} from "../service/board";
import {dictionariesRequest} from "../service/dictionaries";

//---------------SYNC ACTIONS-----------------

export const boardsAction = (json) => ({type: BOARDS, payload: json});
export const loaderAction = () => ({type: LOADER});
export const loggedAction = () => ({type: LOGGED});
export const errorMessageAction = (error) => ({type: ERROR_MESSAGE, payload: error});
export const errorValidationAction = () => ({type: ERROR_VALIDATION});
export const categoriesAction = (json) => ({type: CATEGORIES, payload: json});
export const iconsAction = (json) => ({type: ICONS, payload: json});

//---------------ASYNC ACTIONS-----------------

export const boardsAsyncAction = () => ((dispatch) => ((boardGetRequest()
        .then(response => dispatch(boardsAction(response)))
        .catch(error => dispatch(errorMessageAction(error.message)))
        .finally(() => dispatch(loaderAction()))
)));

export const categoriesAsyncAction = () => ((dispatch) => ((dictionariesRequest('categories')
        .then(response => dispatch(categoriesAction(response)))
        .catch(error => dispatch(errorMessageAction(error.message)))
        .finally(() => dispatch(loaderAction()))
)));

export const iconsAsyncAction = () => ((dispatch) => ((dictionariesRequest('board-icons')
        .then(response => dispatch(iconsAction(response)))
        .catch(error => dispatch(errorMessageAction(error.message)))
        .finally(() => dispatch(loaderAction()))
)));
