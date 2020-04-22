import produce from "immer";

export const FETCHED_BOARD = 'FETCHED_BOARDS';
export const FETCHED_BOARD_REQUESTED = 'FETCHED_BOARDS_REQUEST';
export const FETCHED_BOARD_SUCCEEDED = 'FETCHED_BOARDS_SUCCEEDED';
export const FETCHED_BOARD_FAILED = 'FETCHED_BOARDS_FAILED';

export const fetchedBoardAction = () => ({type: FETCHED_BOARD});
export const requestedBoardAction = () => ({type: FETCHED_BOARD_REQUESTED});
export const succeededBoardAction = (json) => ({type: FETCHED_BOARD_SUCCEEDED, payload: json});
export const failedBoardAction = () => ({type: FETCHED_BOARD_FAILED});

const initialState = [];

export default function board(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case FETCHED_BOARD_REQUESTED:
                return draft;
            case FETCHED_BOARD_SUCCEEDED:
                return draft = action.payload;
            case FETCHED_BOARD_FAILED:
                return state;
            default:
                return draft;
        }
    });
}