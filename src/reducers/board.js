import {createAction, createReducer} from "@reduxjs/toolkit";

//-----------CREATE_ACTIONS------------------

export const boardRequest = createAction('BOARD_REQUEST');
export const boardSucceed = createAction('BOARD_SUCCEED');
export const boardFail = createAction('BOARD_FAIL');

const INITIAL_STATE = {
    data: [],
    loader: false,
    error: ''
};

//-----------CREATE_REDUCER------------------

export default createReducer(INITIAL_STATE, {
    [boardRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [boardSucceed]: (state, action) => {
        state.loader = false;
        state.data = action.payload;
    },
    [boardFail]: (state, action) => {
        state.error = action.payload;
        state.loader = false;
    },
});
