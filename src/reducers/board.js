import produce from "immer";

export const FETCHED_BOARD_REQUESTED = 'FETCHED_BOARDS_REQUEST';
export const FETCHED_BOARD_SUCCEEDED = 'FETCHED_BOARDS_SUCCEEDED';
export const FETCHED_BOARD_FAILED = 'FETCHED_BOARDS_FAILED';

export const requestedBoard = () => ({type: FETCHED_BOARD_REQUESTED});
export const succeededBoard = (json) => ({type: FETCHED_BOARD_SUCCEEDED, payload: json});
export const failedBoard = () => ({type: FETCHED_BOARD_FAILED});

const INITIAL_STATE = {
    data: [],
    loader: false,
    error: false
};

export default (state = INITIAL_STATE, action) => produce(state, draft => {
    switch (action.type) {
        case FETCHED_BOARD_REQUESTED:
            draft.loader = true;
            break;
        case FETCHED_BOARD_SUCCEEDED:
            draft.data = action.payload;
            draft.loader = false;
            break;
        case FETCHED_BOARD_FAILED:
            draft.loader = false;
            break;
        default:
            return state;
    }
});
