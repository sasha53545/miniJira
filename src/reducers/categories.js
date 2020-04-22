import produce from "immer";
import {FETCHED_BOARD_FAILED, FETCHED_BOARD_REQUESTED, FETCHED_BOARD_SUCCEEDED} from "./board";

export const FETCHED_CATEGORIES = 'DICTIONARIES/FETCHED_CATEGORIES';
export const FETCHED_CATEGORIES_REQUESTED = 'DICTIONARIES/FETCHED_CATEGORIES_REQUEST';
export const FETCHED_CATEGORIES_SUCCEEDED = 'DICTIONARIES/FETCHED_CATEGORIES_SUCCEEDED';
export const FETCHED_CATEGORIES_FAILED = 'DICTIONARIES/FETCHED_CATEGORIES_FAILED';

export const fetchedCategoriesAction = () => ({ type: FETCHED_CATEGORIES });
export const requestedCategoriesAction = () => ({type: FETCHED_CATEGORIES_REQUESTED});
export const succeededCategoriesAction = (json) => ({type: FETCHED_CATEGORIES_SUCCEEDED, payload: json});
export const failedCategoriesAction = () => ({type: FETCHED_CATEGORIES_FAILED});

const initialState = [];

export default function categories(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case FETCHED_CATEGORIES_REQUESTED:
                return draft;
            case FETCHED_CATEGORIES_SUCCEEDED:
                return draft = action.payload;
            case FETCHED_CATEGORIES_FAILED:
                return draft;
            default:
                return draft;
        }
    });
}