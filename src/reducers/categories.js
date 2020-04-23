import produce from "immer";

export const FETCHED_CATEGORIES_REQUESTED = 'DICTIONARIES/FETCHED_CATEGORIES_REQUEST';
export const FETCHED_CATEGORIES_SUCCEEDED = 'DICTIONARIES/FETCHED_CATEGORIES_SUCCEEDED';
export const FETCHED_CATEGORIES_FAILED = 'DICTIONARIES/FETCHED_CATEGORIES_FAILED';

export const requestedCategories = () => ({type: FETCHED_CATEGORIES_REQUESTED});
export const succeededCategories = (json) => ({type: FETCHED_CATEGORIES_SUCCEEDED, payload: json});
export const failedCategories = () => ({type: FETCHED_CATEGORIES_FAILED});

const INITIAL_STATE = {
    data: [],
    loader: false,
    error: false
};

export default (state = INITIAL_STATE, action) => produce(state, draft => {
    switch (action.type) {
        case FETCHED_CATEGORIES_REQUESTED:
            draft.loader = true;
            break;
        case FETCHED_CATEGORIES_SUCCEEDED:
            draft.data = action.payload;
            draft.loader = false;
            break;
        case FETCHED_CATEGORIES_FAILED:
            draft.loader = false;
            break;
        default:
            return state;
    }
});
