import {CATEGORIES, ICONS} from "./types";

let initialState = {
    categories: [],
    icons: []
};

export default function dictionariesReducer(state = initialState, action) {
    if (action.type === CATEGORIES) {
        return {
            ...state,
            categories: state.categories.concat(action.payload)
        }
    }

    if (action.type === ICONS) {
        return {
            ...state,
            icons: state.icons.concat(action.payload)
        }
    }
    return state;
}