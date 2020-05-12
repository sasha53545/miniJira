import {call, put, takeEvery} from 'redux-saga/effects'
import {dictionariesAsync} from "../service/dictionaries";
import {boardGetAsync, boardPostAsync} from "../service/board";
import {boardGetFail, boardGetSucceed, boardPostFail, boardPostSucceed} from "./board";
import {iconsFail, iconsSucceed} from "./icons";
import {
    categoriesFail,
    categoriesSucceed,
} from "./categories";
import {signInAsync, signUpAsync, updateTokensAsync} from "../service/auth";
import {customHistory} from "../index";
import {
    localStorageGetItemFail, localStorageGetItemRequest,
    localStorageGetItemSucceed, localStorageRemoveItemFail, localStorageRemoveItemRequest,
    localStorageRemoveItemSucceed, localStorageSetItemFail, localStorageSetItemRequest,
    localStorageSetItemSucceed, signInFail, signInSucceed, signUpFail, signUpSucceed
} from "./auth";
import {tasksGetFail, tasksGetSucceed} from "./tasks";
import {tasksGetAsync, tasksPostAsync} from "../service/task";

function* mySagaWatcher() {
    yield takeEvery('BOARD_GET_REQUEST', boardGetWorker);
    yield takeEvery('BOARD_POST_REQUEST', boardPostWorker);
    yield takeEvery('TASKS_GET_REQUEST', tasksGetWorker);
    yield takeEvery('TASKS_POST_REQUEST', tasksPostWorker);
    yield takeEvery('ICONS_REQUEST', iconsWorker);
    yield takeEvery('CATEGORIES_REQUEST', categoriesWorker);
    yield takeEvery('SIGN_IN_REQUEST', signInWorker);
    yield takeEvery('SIGN_UP_REQUEST', signUpWorker);
    yield takeEvery('LOCALSTORAGE_GET_ITEM_REQUEST', localStorageGetItemWorker);
    yield takeEvery('LOCALSTORAGE_SET_ITEM_REQUEST', localStorageSetItemWorker);
    yield takeEvery('LOCALSTORAGE_REMOVE_ITEM_REQUEST', localStorageRemoveItemWorker);
}

// ---------LOCALSTORAGE-------------
//----------------------------get_item-----
function* localStorageGetItemWorker(action) {
    try {
        let data = yield call(() => localStorage.getItem(action.payload.key));
        data = JSON.parse(data);
        if (data && data.accessTokenExpiresIn < Date.now()) {
            try {
                const response = yield call(() => updateTokensAsync(data));
                put(localStorageRemoveItemRequest({key: 'TOKEN'}));
                put(localStorageSetItemRequest({token: 'TOKEN', data: response}));

                yield put(localStorageGetItemSucceed({data: response}));
            } catch (error) {
                put(localStorageRemoveItemRequest({key: 'TOKEN'}));
            }
        } else yield put(localStorageGetItemSucceed({data: data}));
    } catch (error) {
        yield put(localStorageGetItemFail({error: error.message}));
    }
}

//----------------------------set_item-----
function* localStorageSetItemWorker(action) {
    try {
        yield call(() => localStorage.setItem(action.payload.token, JSON.stringify(action.payload.data)));
        yield put(localStorageSetItemSucceed());
    } catch (error) {
        yield put(localStorageSetItemFail({error: error.message}));
    }
}

//----------------------------remove_item-----
function* localStorageRemoveItemWorker(action) {
    try {
        yield call(() => localStorage.removeItem(action.payload.key));
        yield put(localStorageRemoveItemSucceed());
    } catch (error) {
        yield put(localStorageRemoveItemFail({error: error.message}));
    }
}

// ---------CATEGORIES------------
function* iconsWorker() {
    try {
        const json = yield call(() => dictionariesAsync('board-icons'));
        yield put(iconsSucceed({icons: json}));
    } catch (error) {
        yield put(iconsFail({error: error.message}));
    }
}

// ---------ICONS------------
function* categoriesWorker() {
    try {
        const json = yield call(() => dictionariesAsync('categories'));
        yield put(categoriesSucceed({categories: json}));
    } catch (error) {
        yield put(categoriesFail({error: error.message}));
    }
}

// ---------BOARD-------------
//----------------------------board_get-----
function* boardGetWorker() {
    try {
        const json = yield call(boardGetAsync);
        yield put(boardGetSucceed({board: json}));
    } catch (error) {
        yield put(boardGetFail({error: error.message}));
    }
}

//----------------------------board_post-----
function* boardPostWorker(action) {
    try {
        yield put(localStorageGetItemRequest({key: 'TOKEN'}));
        yield call(() => boardPostAsync(action.payload.token, action.payload.form));
        yield customHistory.push('/dashboard');
        yield put(boardPostSucceed());
    } catch (error) {
        yield put(boardPostFail({error: error.message}));
    }
}

// ---------TASKS-------------
//----------------------------tasks_get-----
function* tasksGetWorker() {
    try {
        const json = yield call(tasksGetAsync);
        yield put(tasksGetSucceed({tasks: json}));
    } catch (error) {
        yield put(tasksGetFail({error: error.message}));
    }
}

//----------------------------tasks_post-----
function* tasksPostWorker(action) {
    try {
        yield put(localStorageGetItemRequest({key: 'TOKEN'}));
        yield call(() => tasksPostAsync(action.payload.token, action.payload.tasks));
        yield customHistory.push('/dashboard');
        yield put(boardPostSucceed());
    } catch (error) {
        yield put(boardPostFail({error: error.message}));
    }
}

// ---------AUTH-------------
//----------------------------sign_in-----
function* signInWorker(action) {
    try {
        const json = yield call(() => signInAsync(action.payload));
        yield put(localStorageSetItemRequest({token: 'TOKEN', data: json}));
        yield customHistory.push('/dashboard');
        yield put(signInSucceed());
    } catch (error) {
        yield put(signInFail({error: error.message}));
    }
}

//----------------------------sign_up-----
function* signUpWorker(action) {
    try {
        const json = yield call(() => signUpAsync(action.payload));
        yield put(localStorageSetItemRequest({token: 'TOKEN', data: json}));
        yield customHistory.push('/dashboard');
        yield put(signUpSucceed());
    } catch (error) {
        yield put(signUpFail({error: error.message}));
    }
}

export default mySagaWatcher;
