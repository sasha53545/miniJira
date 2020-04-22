import {ERROR_MESSAGE, ERROR_VALIDATION} from "./errors";
import produce from "immer";

export const LOADER = 'FLAGS/LOADER';
export const LOGGED = 'FLAGS/LOGGED';

export const loaderAction = () => ({type: LOADER});
export const loggedAction = () => ({type: LOGGED});

const initialState = {
    loader: false,
    logged: false
};

export default function flags(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case LOADER:
                draft.loader = !draft.loader;
                return draft;
            case LOGGED:
                draft.logged = !draft.logged;
                return draft;
            default:
                return draft;
        }
    });
}