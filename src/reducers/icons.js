import {createAction, createReducer} from "@reduxjs/toolkit";

//-----------CREATE_ACTIONS------------------

export const iconsRequest = createAction('ICONS_REQUEST');
export const iconsSucceed = createAction('ICONS_SUCCEED');
export const iconsFail = createAction('ICONS_FAIL');

const INITIAL_STATE = {
    data: [],
    loader: false,
    error: ''
};

//-----------CREATE_REDUCER------------------

export default createReducer(INITIAL_STATE, {
    [iconsRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [iconsSucceed]: (state, action) => {
        state.loader = false;
        state.data = action.payload;
    },
    [iconsFail]: (state, action) => {
        state.error = action.payload;
        state.loader = false;
    },
});
