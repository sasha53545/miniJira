import {BOARDS} from "./types";

let inititalState = {
    board: []
};

export default function boardsReducer(state = inititalState, action) {
    if (action.type === BOARDS) {
        return {
            board: state.board.concat(action.payload)
        };
    }
    return state;
}