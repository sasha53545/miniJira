import {call, put, takeEvery} from 'redux-saga/effects'
import {dictionariesAsync} from "../service/dictionaries";
import {boardGetAsync, boardPostAsync} from "../service/board";
import {boardFail, boardSucceed} from "./board";
import {iconsFail, iconsSucceed} from "./icons";
import {
    categoriesFail,
    categoriesSucceed,
} from "./categories";
import {signInAsync, signUpAsync, updateTokensAsync} from "../service/auth";
import {customHistory} from "../index";
import {
    localStorageGetItemFail,
    localStorageGetItemSucceed, localStorageRemoveItemFail, localStorageRemoveItemRequest,
    localStorageRemoveItemSucceed, localStorageSetItemFail, localStorageSetItemRequest,
    localStorageSetItemSucceed, signInFail, signInSucceed, signUpFail, signUpSucceed
} from "./auth";

function* mySagaWatcher() {
    yield takeEvery('BOARD_REQUEST', boardGetWorker);
    yield takeEvery('BOARD_REQUEST', boardPostWorker);
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
        let data = yield call(() => localStorage.getItem(action.payload.key));
        data = JSON.parse(data);
        if (data && data.accessTokenExpiresIn < Date.now()) {
            try {
                const response = yield call(() => updateTokensAsync(data));
                put(localStorageRemoveItemRequest({key: 'TOKEN'}));
                put(localStorageSetItemRequest({token: 'TOKEN', data: response}));

                yield put(localStorageGetItemSucceed({data: response}));
            } catch (error) {
                put(localStorageRemoveItemRequest('TOKEN'));
            }
        } else yield put(localStorageGetItemSucceed({data: data}));
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

// ---------CATEGORIES_AND_ICONS-------------

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

// ---------BOARD-------------
function* boardGetWorker() {
    try {
        const json = yield call(boardGetAsync);
        yield put(boardSucceed(json));
    } catch (error) {
        yield put(boardFail(error.message));
    }
}

function* boardPostWorker(action) {
    try {
        const json = yield call(boardPostAsync);
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
