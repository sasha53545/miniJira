import {call, put, takeEvery} from 'redux-saga/effects'
import {dictionariesRequest} from "../service/dictionaries";
import {boardGetRequest} from "../service/board";
import {failedBoard, FETCHED_BOARD_REQUESTED, succeededBoard} from "./board";
import {failedIcons, FETCHED_ICONS_REQUESTED, succeededIcons} from "./icons";
import {failedCategories, FETCHED_CATEGORIES_REQUESTED, succeededCategories} from "./categories";
import {
    failedSignIn,
    failedSignUp,
    failLocalStorageGetItem,
    failLocalStorageRemoveItem, failLocalStorageSetItem,
    FETCHED_SIGN_IN_REQUESTED,
    FETCHED_SIGN_UP_REQUESTED,
    LOCALSTORAGE_GET_ITEM_REQUEST,
    LOCALSTORAGE_REMOVE_ITEM_REQUEST,
    LOCALSTORAGE_SET_ITEM_REQUEST, requestLocalStorageSetItem,
    succeededSignIn,
    succeededSignUp,
    succeedLocalStorageGetItem,
    succeedLocalStorageRemoveItem, succeedLocalStorageSetItem
} from "./auth";
import {signInRequest, signUpRequest} from "../service/auth";
import {customHistory} from "../index";

function* mySagaWatcher() {
    yield takeEvery(FETCHED_BOARD_REQUESTED, boardWorker);
    yield takeEvery(FETCHED_ICONS_REQUESTED, iconsWorker);
    yield takeEvery(FETCHED_CATEGORIES_REQUESTED, categoriesWorker);
    yield takeEvery(FETCHED_SIGN_IN_REQUESTED, signInWorker);
    yield takeEvery(FETCHED_SIGN_UP_REQUESTED, signUpWorker);
    yield takeEvery(LOCALSTORAGE_GET_ITEM_REQUEST, localStorageGetItemWorker);
    yield takeEvery(LOCALSTORAGE_SET_ITEM_REQUEST, localStorageSetItemWorker);
    yield takeEvery(LOCALSTORAGE_REMOVE_ITEM_REQUEST, localStorageRemoveItemWorker);
}

// ---------LOCALSTORAGE-------------

function* localStorageGetItemWorker(action) {
    try {
        const data = yield call(() => localStorage.getItem(action.payload.key));
        yield put(succeedLocalStorageGetItem(JSON.parse(data)));
    } catch (error) {
        yield put(failLocalStorageGetItem(error.message));
    }
}

function* localStorageSetItemWorker(action) {
    try {
        yield call(() => localStorage.setItem(action.payload.key, JSON.stringify(action.payload.data)));
        yield put(succeedLocalStorageSetItem());
    } catch (error) {
        yield put(failLocalStorageSetItem(error.message));
    }
}

function* localStorageRemoveItemWorker(action) {
    try {
        yield call(() => localStorage.removeItem(action.payload.key));
        yield put(succeedLocalStorageRemoveItem());
    } catch (error) {
        yield put(failLocalStorageRemoveItem(error.message));
    }
}

// ---------BOARD_CATEGORIES_ICONS-------------

function* iconsWorker() {
    try {
        const json = yield call(() => dictionariesRequest('board-icons'));
        yield put(succeededIcons(json));
    } catch (error) {
        yield put(failedIcons(error.message));
    }
}

function* categoriesWorker() {
    try {
        const json = yield call(() => dictionariesRequest('categories'));
        yield put(succeededCategories(json));
    } catch (error) {
        yield put(failedCategories(error.message));
    }
}

function* boardWorker() {
    try {
        const json = yield call(boardGetRequest);
        yield put(succeededBoard(json));
    } catch (error) {
        yield put(failedBoard(error.message));
    }
}

// ---------AUTH-------------

function* signInWorker(action) {
    try {
        const form = {
            email: action.payload.email,
            password: action.payload.password
        }
        const json = yield call(() => signInRequest(form));
        yield put(requestLocalStorageSetItem('TOKEN', json));
        yield customHistory.push('/dashboard');
        yield put(succeededSignIn());
    } catch (error) {
        yield put(failedSignIn(error.message));
    }
}

function* signUpWorker(action) {
    try {
        const form = {
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.name,
        }
        const json = yield call(() => signUpRequest(form));
        yield put(requestLocalStorageSetItem('TOKEN', json));
        yield customHistory.push('/dashboard');
        yield put(succeededSignUp());
    } catch (error) {
        yield put(failedSignUp(error.message));
    }
}

export default mySagaWatcher;
