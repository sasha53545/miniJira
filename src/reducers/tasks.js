import {createAction, createReducer} from "@reduxjs/toolkit";

//-----------CREATE_ACTIONS------------------

export const tasksOfBoardGet = createAction('TASKS_OF_BOARD_GET');

export const tasksGetRequest = createAction('TASKS_GET_REQUEST');
export const tasksGetSucceed = createAction('TASKS_GET_SUCCEED');
export const tasksGetFail = createAction('TASKS_GET_FAIL');

export const tasksPostRequest = createAction('TASKS_POST_REQUEST');
export const tasksPostSucceed = createAction('TASKS_POST_SUCCEED');
export const tasksPostFail = createAction('TASKS_POST_FAIL');

const INITIAL_STATE = {
    data: [],
    loader: false,
    error: '',
    tasksOfBoard: []
};

//-----------CREATE_REDUCER------------------

export default createReducer(INITIAL_STATE, {
    // ---------TASKS_OF_BOARD_GET-------------
    [tasksOfBoardGet]: (state, action) => {
        state.tasksOfBoard = [];
        state.tasksOfBoard = action.payload.tasks;
    },

    // ---------TASKS_GET-------------
    [tasksGetRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [tasksGetSucceed]: (state, action) => {
        state.data = action.payload.tasks;
        state.loader = false;
    },
    [tasksGetFail]: (state, action) => {
        state.error = action.payload.error;
        state.loader = false;
    },

    // ---------TASKS_POST-------------
    [tasksPostRequest]: (state) => {
        state.loader = true;
        state.error = '';
    },
    [tasksPostSucceed]: (state) => {
        state.loader = false;
    },
    [tasksPostFail]: (state, action) => {
        state.error = action.payload.error;
        state.loader = false;
    },
});
