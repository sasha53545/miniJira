import {LOADER, LOGGED} from "./types";

let inititalState = {
    loader: false,
    logged: false
};

export default function flagsReducer(state = inititalState, action) {
    if (action.type === LOADER) {
        return {
            ...state,
            loader: !state.loader
        };
    }
    if (action.type === LOGGED) {
        return {
            ...state,
            logged: !state.logged
        };
    }
    return state;
}