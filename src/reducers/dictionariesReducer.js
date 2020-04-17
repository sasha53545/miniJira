import {DICTIONARIES} from "./types";

let dictionaries = [];

export default function dictionariesReducer(state = dictionaries, action) {
    if (action.type === DICTIONARIES) {
        return state.concat(action.payload);
    } else {
        return state;
    }
}