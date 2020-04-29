import {call, put, takeEvery} from 'redux-saga/effects'
import {dictionariesAsync} from "../service/dictionaries";
import {boardGetAsync} from "../service/board";
import {boardFail, boardSucceed} from "./board";
import {iconsFail, iconsSucceed} from "./icons";
import {
    categoriesFail,
    categoriesSucceed,
} from "./categories";
import {signInAsync, signUpAsync} from "../service/auth";
import {customHistory} from "../index";
import {
    localStorageGetItemFail,
    localStorageGetItemSucceed, localStorageRemoveItemFail,
    localStorageRemoveItemSucceed, localStorageSetItemFail, localStorageSetItemRequest,
    localStorageSetItemSucceed, signInFail, signInSucceed, signUpFail, signUpSucceed
} from "./auth";

function* mySagaWatcher() {
    yield takeEvery('BOARD_REQUEST', boardWorker);
    yield takeEvery('ICONS_REQUEST', iconsWorker);
    yield takeEvery('CATEGORIES_REQUEST', categoriesWorker);
    yield takeEvery('SIGN_IN_REQUEST', signInWorker);
    yield takeEvery('SIGN_UP_REQUEST', signUpWorker);
    yield takeEvery('LOCALSTORAGE_GET_ITEM_REQUEST', localStorageGetItemWorker);
    yield takeEvery('LOCALSTORAGE_SET_ITEM_REQUEST', localStorageSetItemWorker);
    yield takeEvery('LOCALSTORAGE_REMOVE_ITEM_REQUEST', localStorageRemoveItemWorker);
}

// ---------LOCALSTORAGE-------------

function* localStorageGetItemWorker(action) {
    try {
        const data = yield call(() => localStorage.getItem(action.payload.key));
        yield put(localStorageGetItemSucceed({data: JSON.parse(data)}));
    } catch (error) {
        yield put(localStorageGetItemFail({error: error.message}));
    }
}

function* localStorageSetItemWorker(action) {
    try {
        yield call(() => localStorage.setItem(action.payload.token, JSON.stringify(action.payload.data)));
        yield put(localStorageSetItemSucceed());
    } catch (error) {
        yield put(localStorageSetItemFail(error.message));
    }
}

function* localStorageRemoveItemWorker(action) {
    try {
        yield call(() => localStorage.removeItem(action.payload.key));
        yield put(localStorageRemoveItemSucceed());
    } catch (error) {
        yield put(localStorageRemoveItemFail(error.message));
    }
}

// ---------BOARD_CATEGORIES_ICONS-------------

function* iconsWorker() {
    try {
        const json = yield call(() => dictionariesAsync('board-icons'));
        yield put(iconsSucceed(json));
    } catch (error) {
        yield put(iconsFail(error.message));
    }
}

function* categoriesWorker() {
    try {
        const json = yield call(() => dictionariesAsync('categories'));
        yield put(categoriesSucceed(json));
    } catch (error) {
        yield put(categoriesFail(error.message));
    }
}

function* boardWorker() {
    try {
        const json = yield call(boardGetAsync);
        yield put(boardSucceed(json));
    } catch (error) {
        yield put(boardFail(error.message));
    }
}

// ---------AUTH-------------

function* signInWorker(action) {
    try {
        const json = yield call(() => signInAsync(action.payload));
        yield put(localStorageSetItemRequest({token: 'TOKEN', data: json}));
        yield customHistory.push('/dashboard');
        yield put(signInSucceed());
    } catch (error) {
        yield put(signInFail(error.message));
    }
}

function* signUpWorker(action) {
    try {
        const form = {
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.name,
        };
        const json = yield call(() => signUpAsync(form));
        yield put(localStorageSetItemRequest({token: 'TOKEN', data: json}));
        yield customHistory.push('/dashboard');
        yield put(signUpSucceed());
    } catch (error) {
        yield put(signUpFail(error.message));
    }
}

export default mySagaWatcher;
