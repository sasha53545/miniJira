import {createAction, createReducer} from "@reduxjs/toolkit";

//-----------CREATE_ACTIONS------------------

export const boardGetRequest = createAction('BOARD_GET_REQUEST');
export const boardGetSucceed = createAction('BOARD_GET_SUCCEED');
export const boardGetFail = createAction('BOARD_GET_FAIL');

export const boardPostRequest = createAction('BOARD_POST_REQUEST');
export const boardPostSucceed = createAction('BOARD_POST_SUCCEED');
export const boardPostFail = createAction('BOARD_POST_FAIL');

const INITIAL_STATE = {
    data: [],
    loader: false,
    error: ''
};

//-----------CREATE_REDUCER------------------

export default createReducer(INITIAL_STATE, {
    // ---------BOARD_GET-------------
    [boardGetRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [boardGetSucceed]: (state, action) => {
        state.data = action.payload.board;
        state.loader = false;
    },
    [boardGetFail]: (state, action) => {
        state.error = action.payload.error;
        state.loader = false;
    },

    // ---------BOARD_POST-------------
    [boardPostRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [boardPostSucceed]: (state) => {
        state.loader = false;
    },
    [boardPostFail]: (state, action) => {
        state.error = action.payload.error;
        state.loader = false;
    },
});
