import produce from "immer";

export const LOGGED = 'FLAGS/LOGGED';

export const logged = () => ({type: LOGGED});

const INITIAL_STATE = {
    logged: false
};

export default (state = INITIAL_STATE, action) => produce(state, draft => {
    switch (action.type) {
        case LOGGED:
            draft.logged = !draft.logged;
            break;
        default:
            return state;
    }
});
