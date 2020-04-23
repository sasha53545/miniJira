import produce from "immer";
//------------TYPES------------------
export const FETCHED_SIGN_IN_REQUESTED = 'FETCHED_SIGN_IN_REQUEST';
export const FETCHED_SIGN_IN_SUCCEEDED = 'FETCHED_SIGN_IN_SUCCEEDED';
export const FETCHED_SIGN_IN_FAILED = 'FETCHED_SIGN_IN_FAILED';
export const FETCHED_SIGN_UP_REQUESTED = 'FETCHED_SIGN_IN_REQUEST';
export const FETCHED_SIGN_UP_SUCCEEDED = 'FETCHED_SIGN_IN_SUCCEEDED';
export const FETCHED_SIGN_UP_FAILED = 'FETCHED_SIGN_IN_FAILED';
//-----------ACTIONS------------------
export const requestedSignIn = () => ({type: FETCHED_SIGN_IN_REQUESTED});
export const succeededSignIn = (json) => ({type: FETCHED_SIGN_IN_SUCCEEDED, payload: json});
export const failedSignIn = () => ({type: FETCHED_SIGN_IN_FAILED});

export const requestedSignUp = () => ({type: FETCHED_SIGN_UP_REQUESTED});
export const succeededSignUp = (json) => ({type: FETCHED_SIGN_UP_SUCCEEDED, payload: json});
export const failedSignUp = () => ({type: FETCHED_SIGN_UP_FAILED});

const INITIAL_STATE = {
    signIn: {
        email: '',
        password: ''
    },
    signUp: {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    },
    loader: false,
    error: false,
    authState: false
};

export default (state = INITIAL_STATE, action) => produce(state, draft => {
    switch (action.type) {
        // ---------SIGN_IN-------------
        case FETCHED_SIGN_IN_REQUESTED:
            draft.loader = true;
            break;
        case FETCHED_SIGN_IN_SUCCEEDED:
            draft.data = action.payload;
            draft.loader = false;
            break;
        case FETCHED_SIGN_IN_FAILED:
            draft.loader = false;
            break;
        // ---------SIGN_UP-------------
        case FETCHED_SIGN_UP_REQUESTED:
            draft.loader = true;
            break;
        case FETCHED_SIGN_UP_SUCCEEDED:
            draft.data = action.payload;
            draft.loader = false;
            break;
        case FETCHED_SIGN_UP_FAILED:
            draft.loader = false;
            break;
        default:
            return state;
    }
});
