import produce from "immer";

//------------TYPES------------------

export const AUTH_STATE = 'AUTH_STATE';

export const FETCHED_SIGN_IN_REQUESTED = 'FETCHED_SIGN_IN_REQUEST';
export const FETCHED_SIGN_IN_SUCCEEDED = 'FETCHED_SIGN_IN_SUCCEEDED';
export const FETCHED_SIGN_IN_FAILED = 'FETCHED_SIGN_IN_FAILED';

export const FETCHED_SIGN_UP_REQUESTED = 'FETCHED_SIGN_UP_REQUEST';
export const FETCHED_SIGN_UP_SUCCEEDED = 'FETCHED_SIGN_UP_SUCCEEDED';
export const FETCHED_SIGN_UP_FAILED = 'FETCHED_SIGN_UP_FAILED';

export const LOCALSTORAGE_GET_ITEM_REQUEST = 'LOCALSTORAGE_GET_ITEM_REQUEST';
export const LOCALSTORAGE_GET_ITEM_SUCCEED = 'LOCALSTORAGE_GET_ITEM_SUCCEED';
export const LOCALSTORAGE_GET_ITEM_FAIL = 'LOCALSTORAGE_GET_ITEM_FAIL';

export const LOCALSTORAGE_SET_ITEM_REQUEST = 'LOCALSTORAGE_SET_ITEM_REQUEST';
export const LOCALSTORAGE_SET_ITEM_SUCCEED = 'LOCALSTORAGE_SET_ITEM_SUCCEED';
export const LOCALSTORAGE_SET_ITEM_FAIL = 'LOCALSTORAGE_SET_ITEM_FAIL';

export const LOCALSTORAGE_REMOVE_ITEM_REQUEST = 'LOCALSTORAGE_REMOVE_ITEM_REQUEST';
export const LOCALSTORAGE_REMOVE_ITEM_SUCCEEDED = 'LOCALSTORAGE_REMOVE_ITEM_SUCCEEDED';
export const LOCALSTORAGE_REMOVE_ITEM_FAILED = 'LOCALSTORAGE_REMOVE_ITEM_FAILED';

//-----------ACTIONS------------------

export const authState = () => ({type: AUTH_STATE});

export const requestedSignIn = (email, password) => ({type: FETCHED_SIGN_IN_REQUESTED, payload: {email, password}});
export const succeededSignIn = () => ({type: FETCHED_SIGN_IN_SUCCEEDED});
export const failedSignIn = () => ({type: FETCHED_SIGN_IN_FAILED});

export const requestedSignUp = (name, email, password) => ({type: FETCHED_SIGN_UP_REQUESTED, payload: {name, email, password}});
export const succeededSignUp = () => ({type: FETCHED_SIGN_UP_SUCCEEDED});
export const failedSignUp = () => ({type: FETCHED_SIGN_UP_FAILED});

export const requestLocalStorageGetItem = (key) => ({type: LOCALSTORAGE_GET_ITEM_REQUEST, payload: key});
export const succeedLocalStorageGetItem = (data) => ({type: LOCALSTORAGE_GET_ITEM_SUCCEED, payload: data});
export const failLocalStorageGetItem = (error) => ({type: LOCALSTORAGE_GET_ITEM_FAIL, payload: error});

export const requestLocalStorageSetItem = (key, data) => ({type: LOCALSTORAGE_SET_ITEM_REQUEST, payload: {key, data}});
export const succeedLocalStorageSetItem = () => ({type: LOCALSTORAGE_SET_ITEM_SUCCEED});
export const failLocalStorageSetItem = (error) => ({type: LOCALSTORAGE_SET_ITEM_FAIL, payload: error});

export const requestLocalStorageRemoveItem = (key) => ({type: LOCALSTORAGE_REMOVE_ITEM_REQUEST, payload: {key}});
export const succeedLocalStorageRemoveItem = () => ({type: LOCALSTORAGE_REMOVE_ITEM_SUCCEEDED});
export const failLocalStorageRemoveItem = (error) => ({type: LOCALSTORAGE_REMOVE_ITEM_FAILED, payload: error});

const INITIAL_STATE = {
    loader: false,
    error: '',
    authState: false,
    localstorage: {
        key: '',
        data: ''
    }
};

export default (state = INITIAL_STATE, action) => produce(state, draft => {
    switch (action.type) {
        // ---------AUTH_STATE-------------
        case AUTH_STATE:
            draft.authState = !draft.authState;
            break;
        // ---------SIGN_IN-------------
        case FETCHED_SIGN_IN_REQUESTED:
            draft.loader = true;
            draft.error = '';
            break;
        case FETCHED_SIGN_IN_SUCCEEDED:
            draft.loader = false;
            draft.authState = true;
            break;
        case FETCHED_SIGN_IN_FAILED:
            draft.error = action.payload;
            draft.loader = false;
            break;
        // ---------SIGN_UP-------------
        case FETCHED_SIGN_UP_REQUESTED:
            draft.loader = true;
            draft.error = '';
            break;
        case FETCHED_SIGN_UP_SUCCEEDED:
            draft.loader = false;
            draft.authState = true;
            break;
        case FETCHED_SIGN_UP_FAILED:
            draft.error = action.payload;
            draft.loader = false;
            break;
        // ---------GET_ITEM_LOCALSTORAGE-------------
        case LOCALSTORAGE_GET_ITEM_REQUEST:
            draft.loader = true;
            draft.error = '';
            break;
        case LOCALSTORAGE_GET_ITEM_SUCCEED:
            draft.loader = false;
            draft.localstorage.data = action.payload.data;
            break;
        case LOCALSTORAGE_GET_ITEM_FAIL:
            draft.error = action.payload
            draft.loader = false;
            break;
        // ---------SET_ITEM_LOCALSTORAGE-------------
        case LOCALSTORAGE_SET_ITEM_REQUEST:
            draft.loader = true;
            draft.error = '';
            draft.authState = true;
            draft.localstorage.key = action.payload.key
            draft.localstorage.data = action.payload.data
            break;
        case LOCALSTORAGE_SET_ITEM_SUCCEED:
            draft.loader = false;
            draft.localstorage.key = '';
            draft.localstorage.data = '';
            break;
        case LOCALSTORAGE_SET_ITEM_FAIL:
            draft.error = action.payload;
            draft.loader = false;
            break;
        // ---------REMOVE_ITEM_LOCALSTORAGE-------------
        case LOCALSTORAGE_REMOVE_ITEM_REQUEST:
            draft.loader = true;
            draft.error = '';
            draft.authState = false;
            draft.localstorage.key = action.payload.key;
            break;
        case LOCALSTORAGE_REMOVE_ITEM_SUCCEEDED:
            draft.loader = false;
            draft.localstorage.key = '';
            break;
        case LOCALSTORAGE_REMOVE_ITEM_FAILED:
            draft.error = action.payload;
            draft.loader = false;
            break;
        default:
            return state;
    }
});
