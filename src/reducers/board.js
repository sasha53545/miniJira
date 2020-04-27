import produce from "immer";

export const FETCHED_BOARD_REQUESTED = 'FETCHED_BOARD_REQUEST';
export const FETCHED_BOARD_SUCCEEDED = 'FETCHED_BOARD_SUCCEEDED';
export const FETCHED_BOARD_FAILED = 'FETCHED_BOARD_FAILED';

export const requestedBoard = () => ({type: FETCHED_BOARD_REQUESTED});
export const succeededBoard = (json) => ({type: FETCHED_BOARD_SUCCEEDED, payload: json});
export const failedBoard = (error) => ({type: FETCHED_BOARD_FAILED, payload: error});

const INITIAL_STATE = {
    data: [],
    loader: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => produce(state, draft => {
    switch (action.type) {
        case FETCHED_BOARD_REQUESTED:
            draft.loader = true;
            draft.error = '';
            break;
        case FETCHED_BOARD_SUCCEEDED:
            draft.data = action.payload;
            draft.loader = false;
            break;
        case FETCHED_BOARD_FAILED:
            draft.error = action.payload;
            draft.loader = false;
            break;
        default:
            return state;
    }
});
