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
        data: null
    }
};

//-----------CREATE_REDUCER------------------

export default createReducer(INITIAL_STATE, {
    // ---------IS_AUTH-------------
    [authState]: (state) => {
        state.authState = !state.authState;
    },

    // ---------SIGN_IN-------------
    [signInRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [signInSucceed]: (state) => {
        state.authState = true;
        state.loader = false;
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
        state.authState = true;
        state.loader = false;
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
        state.localstorage.data = action.payload.data;
        state.authState = state.localstorage.data ? true : false;
        state.loader = false;
    },
    [localStorageGetItemFail]: (state, action) => {
        state.error = action.payload.error;
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
    [localStorageRemoveItemRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [localStorageRemoveItemSucceed]: (state) => {
        state.authState = false;
        state.loader = false;
    },
    [localStorageRemoveItemFail]: (state, action) => {
        state.error = action.payload;
        state.loader = false;
    },
});
