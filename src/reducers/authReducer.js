import {SIGNIN, SIGNUP} from "./types";

let inititalState = {
    signIn: {
        email: '',
        password: ''
    },
    signUp: {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    }
};

export default function authReducer(state = inititalState, action) {
    if (action.type === SIGNIN) {
        return {
            ...state,
            signIn: action.payload
        };
    }
    if (action.type === SIGNUP) {
        return {
            ...state,
            signUp: action.payload
        };
    }
    return state;
}