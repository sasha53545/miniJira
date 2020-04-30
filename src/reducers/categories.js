import {createAction, createReducer} from "@reduxjs/toolkit";

//-----------CREATE_ACTIONS------------------

export const categoriesRequest = createAction('CATEGORIES_REQUEST');
export const categoriesSucceed = createAction('CATEGORIES_SUCCEED');
export const categoriesFail = createAction('CATEGORIES_FAIL');

const INITIAL_STATE = {
    data: [],
    loader: false,
    error: ''
};

//-----------CREATE_REDUCER------------------

export default createReducer(INITIAL_STATE, {
    [categoriesRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [categoriesSucceed]: (state, action) => {
        state.loader = false;
        state.data = action.payload.categories;
    },
    [categoriesFail]: (state, action) => {
        state.error = action.payload.error;
        state.loader = false;
    },
});
