import produce from "immer";
import {FETCHED_CATEGORIES_FAILED, FETCHED_CATEGORIES_REQUESTED, FETCHED_CATEGORIES_SUCCEEDED} from "./categories";

export const FETCHED_ICONS = 'DICTIONARIES/FETCHED_ICONS';
export const FETCHED_ICONS_REQUESTED = 'DICTIONARIES/ICONS_FETCH_REQUEST';
export const FETCHED_ICONS_SUCCEEDED = 'DICTIONARIES/ICONS_FETCH_SUCCEEDED';
export const FETCHED_ICONS_FAILED = 'DICTIONARIES/ICONS_FETCH_FAILED';

export const fetchedIconsAction = () => ({type: FETCHED_ICONS});
export const requestedIconsAction = () => ({type: FETCHED_ICONS_REQUESTED});
export const succeededIconsAction = (json) => ({type: FETCHED_ICONS_SUCCEEDED, payload: json});
export const failedIconsAction = () => ({type: FETCHED_ICONS_FAILED});

const initialState = [];

export default function icons(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case FETCHED_ICONS_REQUESTED:
                return draft;
            case FETCHED_ICONS_SUCCEEDED:
                return draft = action.payload;
            case FETCHED_ICONS_FAILED:
                return draft;
            default:
                return draft;
        }
    });
}