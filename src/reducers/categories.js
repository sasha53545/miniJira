import produce from "immer";

export const FETCHED_CATEGORIES_REQUESTED = 'DICTIONARIES/FETCHED_CATEGORIES_REQUEST';
export const FETCHED_CATEGORIES_SUCCEEDED = 'DICTIONARIES/FETCHED_CATEGORIES_SUCCEEDED';
export const FETCHED_CATEGORIES_FAILED = 'DICTIONARIES/FETCHED_CATEGORIES_FAILED';

export const requestedCategories = () => ({type: FETCHED_CATEGORIES_REQUESTED});
export const succeededCategories = (json) => ({type: FETCHED_CATEGORIES_SUCCEEDED, payload: json});
export const failedCategories = (error) => ({type: FETCHED_CATEGORIES_FAILED, payload: error});

const INITIAL_STATE = {
    data: [],
    loader: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => produce(state, draft => {
    switch (action.type) {
        case FETCHED_CATEGORIES_REQUESTED:
            draft.loader = true;
            draft.error = '';
            break;
        case FETCHED_CATEGORIES_SUCCEEDED:
            draft.data = action.payload;
            draft.loader = false;
            break;
        case FETCHED_CATEGORIES_FAILED:
            draft.error = action.payload;
            draft.loader = false;
            break;
        default:
            return state;
    }
});
