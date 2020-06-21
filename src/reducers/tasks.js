import {createAction, createReducer} from "@reduxjs/toolkit";

//-----------CREATE_ACTIONS------------------

export const tasksOfBoardGet = createAction('TASKS_OF_BOARD_GET');
export const taskOfBoardPost = createAction('TASKS_OF_BOARD_POST');

export const tasksGetRequest = createAction('TASKS_GET_REQUEST');
export const tasksGetSucceed = createAction('TASKS_GET_SUCCEED');
export const tasksGetFail = createAction('TASKS_GET_FAIL');

export const tasksPostRequest = createAction('TASKS_POST_REQUEST');
export const tasksPostSucceed = createAction('TASKS_POST_SUCCEED');
export const tasksPostFail = createAction('TASKS_POST_FAIL');

export const createTaskAction = (data) => async (dispatch) => {
  await dispatch(tasksPostRequest(data));
};

const INITIAL_STATE = {
  data: [],
  loader: false,
  error: '',
  tasksOfBoard: [],
  tasksID: ''
};

//-----------CREATE_REDUCER------------------
export default createReducer(INITIAL_STATE, {
  // ---------TASKS_OF_BOARD_GET-------------
  [tasksOfBoardGet]: (state, action) => {
    state.tasksOfBoard = [];
    state.tasksOfBoard = action.payload.tasks;
    state.tasksID = action.payload.tasksID;
  },

  // ---------TASK_OF_BOARD_POST-------------
  [taskOfBoardPost]: (state, action) => {

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
  [tasksPostSucceed]: (state, action) => {
    state.tasksOfBoard = action.payload.tasks;
    state.loader = false;
  },
  [tasksPostFail]: (state, action) => {
    state.error = action.payload.error;
    state.loader = false;
  },
});
