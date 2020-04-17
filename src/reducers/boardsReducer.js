import {BOARDS} from "./types";

let board = [];

export default function boardsReducer(state = board, action) {
    if (action.type === BOARDS) {
        return state.concat(action.payload);
    } else {
        return state;
    }
}