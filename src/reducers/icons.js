import produce from "immer";

export const FETCHED_ICONS_REQUESTED = 'DICTIONARIES/ICONS_FETCH_REQUEST';
export const FETCHED_ICONS_SUCCEEDED = 'DICTIONARIES/ICONS_FETCH_SUCCEEDED';
export const FETCHED_ICONS_FAILED = 'DICTIONARIES/ICONS_FETCH_FAILED';

export const requestedIcons = () => ({type: FETCHED_ICONS_REQUESTED});
export const succeededIcons = (json) => ({type: FETCHED_ICONS_SUCCEEDED, payload: json});
export const failedIcons = (error) => ({type: FETCHED_ICONS_FAILED, payload: error});

const INITIAL_STATE = {
    data: [],
    loader: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => produce(state, draft => {
    switch (action.type) {
        case FETCHED_ICONS_REQUESTED:
            draft.loader = true;
            draft.error = '';
            break;
        case FETCHED_ICONS_SUCCEEDED:
            draft.data = action.payload;
            draft.loader = false;
            break;
        case FETCHED_ICONS_FAILED:
            draft.error = action.payload;
            draft.loader = false;
            break;
        default:
            return state;
    }
});
