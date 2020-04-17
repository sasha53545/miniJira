import {BOARDS, DICTIONARIES} from './types';

export function boardsAction() {
    return async (dispatch) => {
        const response = await fetch('/board');

        if (response.status !== 200) {
            throw await response.json();
        }

        const json = await response.json();
        console.log(json);
        dispatch({type: BOARDS, payload: json});
    };
}

// export function dictionariesAction() {
//     return boardGetRequest(dispatch)
//         .then(response => {
//             dispatch({type: DICTIONARIES, payload: response});
//         });
// }
