import {createAction, createReducer} from "@reduxjs/toolkit";

//-----------CREATE_ACTIONS------------------

export const authState = createAction('AUTH_STATE');

export const signInRequest = createAction('SIGN_IN_REQUEST');
export const signInSucceed = createAction('SIGN_IN_SUCCEED');
export const signInFail = createAction('SIGN_IN_FAIL');

export const signUpRequest = createAction('SIGN_UP_REQUEST');
export const signUpSucceed = createAction('SIGN_UP_SUCCEED');
export const signUpFail = createAction('SIGN_UP_FAIL');

export const localStorageGetItemRequest = createAction('LOCALSTORAGE_GET_ITEM_REQUEST');
export const localStorageGetItemSucceed = createAction('LOCALSTORAGE_GET_ITEM_SUCCEED');
export const localStorageGetItemFail = createAction('LOCALSTORAGE_GET_ITEM_FAIL');

export const localStorageSetItemRequest = createAction('LOCALSTORAGE_SET_ITEM_REQUEST');
export const localStorageSetItemSucceed = createAction('LOCALSTORAGE_SET_ITEM_SUCCEED');
export const localStorageSetItemFail = createAction('LOCALSTORAGE_SET_ITEM_FAIL');

export const localStorageRemoveItemRequest = createAction('LOCALSTORAGE_REMOVE_ITEM_REQUEST');
export const localStorageRemoveItemSucceed = createAction('LOCALSTORAGE_REMOVE_ITEM_SUCCEED');
export const localStorageRemoveItemFail = createAction('LOCALSTORAGE_REMOVE_ITEM_FAIL');

const INITIAL_STATE = {
    loader: false,
    error: '',
    authState: false,
    localstorage: {
        key: '',
        data: ''
    }
};

//-----------CREATE_REDUCER------------------

export default createReducer(INITIAL_STATE, {
    // ---------SIGN_IN-------------
    [signInRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [signInSucceed]: (state) => {
        state.loader = false;
        state.authState = true;
    },
    [signInFail]: (state, action) => {
        state.error = action.payload;
        state.loader = false;
    },

    // ---------SIGN_UP-------------
    [signUpRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [signUpSucceed]: (state) => {
        state.loader = false;
        state.authState = true;
    },
    [signUpFail]: (state, action) => {
        state.error = action.payload;
        state.loader = false;
    },

    // ---------GET_ITEM_LOCALSTORAGE-------------
    [localStorageGetItemRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [localStorageGetItemSucceed]: (state, action) => {
        state.loader = false;
        state.localstorage.data = action.payload.data;
    },
    [localStorageGetItemFail]: (state, action) => {
        state.error = action.payload;
        state.loader = false;
    },

    // ---------SET_ITEM_LOCALSTORAGE-------------
    [localStorageSetItemRequest]: (state, action) => {
        state.loader = true;
        state.error = '';
        state.authState = true;
        state.localstorage.key = action.payload.token;
        state.localstorage.data = action.payload.data;
    },
    [localStorageSetItemSucceed]: (state) => {
        state.loader = false;
        state.localstorage.key = '';
        state.localstorage.data = '';
    },
    [localStorageSetItemFail]: (state, action) => {
        state.error = action.payload;
        state.loader = false;
    },

    // ---------REMOVE_ITEM_LOCALSTORAGE-------------
    [localStorageSetItemRequest]: (state, action) => {
        state.loader = true;
        state.error = '';
        state.authState = false;
        state.localstorage.key = action.payload.key;
    },
    [localStorageSetItemSucceed]: (state) => {
        state.loader = false;
        state.localstorage.key = '';
    },
    [localStorageSetItemFail]: (state, action) => {
        state.error = action.payload;
        state.loader = false;
    },
});

// export default (state = INITIAL_STATE, action) => produce(state, draft => {
    // switch (action.type) {
    //     // ---------AUTH_STATE-------------
    //     case AUTH_STATE:
    //         draft.authState = !draft.authState;
    //         break;
        // // ---------SIGN_IN-------------
        // case FETCHED_SIGN_IN_REQUESTED:
        //     draft.loader = true;
        //     draft.error = '';
        //     break;
        // case FETCHED_SIGN_IN_SUCCEEDED:
        //     draft.loader = false;
        //     draft.authState = true;
        //     break;
        // case FETCHED_SIGN_IN_FAILED:
        //     draft.error = action.payload;
        //     draft.loader = false;
        //     break;
        // // ---------SIGN_UP-------------
        // case FETCHED_SIGN_UP_REQUESTED:
        //     draft.loader = true;
        //     draft.error = '';
        //     break;
        // case FETCHED_SIGN_UP_SUCCEEDED:
        //     draft.loader = false;
        //     draft.authState = true;
        //     break;
        // case FETCHED_SIGN_UP_FAILED:
        //     draft.error = action.payload;
        //     draft.loader = false;
        //     break;
        // ---------GET_ITEM_LOCALSTORAGE-------------
    //     case LOCALSTORAGE_GET_ITEM_REQUEST:
    //         draft.loader = true;
    //         draft.error = '';
    //         break;
    //     case LOCALSTORAGE_GET_ITEM_SUCCEED:
    //         draft.loader = false;
    //         draft.localstorage.data = action.payload.data;
    //         break;
    //     case LOCALSTORAGE_GET_ITEM_FAIL:
    //         draft.error = action.payload
    //         draft.loader = false;
    //         break;
    //     // ---------SET_ITEM_LOCALSTORAGE-------------
    //     case LOCALSTORAGE_SET_ITEM_REQUEST:
    //         draft.loader = true;
    //         draft.error = '';
    //         draft.authState = true;
    //         draft.localstorage.key = action.payload.key
    //         draft.localstorage.data = action.payload.data
    //         break;
    //     case LOCALSTORAGE_SET_ITEM_SUCCEED:
    //         draft.loader = false;
    //         draft.localstorage.key = '';
    //         draft.localstorage.data = '';
    //         break;
    //     case LOCALSTORAGE_SET_ITEM_FAIL:
    //         draft.error = action.payload;
    //         draft.loader = false;
    //         break;
    //     // ---------REMOVE_ITEM_LOCALSTORAGE-------------
    //     case LOCALSTORAGE_REMOVE_ITEM_REQUEST:
    //         draft.loader = true;
    //         draft.error = '';
    //         draft.authState = false;
    //         draft.localstorage.key = action.payload.key;
    //         break;
    //     case LOCALSTORAGE_REMOVE_ITEM_SUCCEEDED:
    //         draft.loader = false;
    //         draft.localstorage.key = '';
    //         break;
    //     case LOCALSTORAGE_REMOVE_ITEM_FAILED:
    //         draft.error = action.payload;
    //         draft.loader = false;
    //         break;
    //     default:
    //         return state;
    // }
// });
