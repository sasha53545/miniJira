import {call, put, takeEvery} from 'redux-saga/effects'
import {dictionariesRequest} from "../service/dictionaries";
import {boardGetRequest} from "../service/board";
import {failedBoard, FETCHED_BOARD_REQUESTED, requestedBoard, succeededBoard} from "./board";
import {failedIcons, FETCHED_ICONS_REQUESTED, requestedIcons, succeededIcons} from "./icons";
import {failedCategories, FETCHED_CATEGORIES_REQUESTED, requestedCategories, succeededCategories} from "./categories";
import {FETCHED_SIGN_IN_REQUESTED, FETCHED_SIGN_UP_REQUESTED, requestedSignIn} from "./auth";
import {signInRequest} from "../service/auth";

function* mySagaWatcher() {
    yield takeEvery(FETCHED_BOARD_REQUESTED, boardsWorker);
    yield takeEvery(FETCHED_ICONS_REQUESTED, iconsWorker);
    yield takeEvery(FETCHED_CATEGORIES_REQUESTED, categoriesWorker);
    yield takeEvery(FETCHED_SIGN_IN_REQUESTED, signInWorker);
    yield takeEvery(FETCHED_SIGN_UP_REQUESTED, signUpWorker);
}

function* iconsWorker() {
    try {
        yield put(requestedIcons);
        const json = yield call(() => dictionariesRequest('board-icons'));
        yield put(succeededIcons(json));
    } catch (error) {
        yield put(failedIcons());
    }
}

function* categoriesWorker() {
    try {
        yield put(requestedCategories);
        const json = yield call(() => dictionariesRequest('categories'));
        yield put(succeededCategories(json));
    } catch (error) {
        yield put(failedCategories(error.message));
    }
}

function* boardsWorker() {
    try {
        yield put(requestedBoard);
        const json = yield call(() => boardGetRequest());
        yield put(succeededBoard(json));
    } catch (error) {
        yield put(failedBoard(error.message));
    }
}

function* signInWorker() {
    try {
        yield put(requestedSignIn);
        const json = yield call(() => signInRequest());
        yield put(succeededBoard(json));
    } catch (error) {
        yield put(failedBoard(error.message));
    }
}

function* signUpWorker() {
    try {
        yield put(requestedBoard);
        const json = yield call(() => boardGetRequest());
        yield put(succeededBoard(json));
    } catch (error) {
        yield put(failedBoard(error.message));
    }
}

export default mySagaWatcher;
