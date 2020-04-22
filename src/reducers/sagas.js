import {call, put, takeEvery} from 'redux-saga/effects'
import {dictionariesRequest} from "../service/dictionaries";
import {boardGetRequest} from "../service/board";
import {
    failedBoardAction,
    FETCHED_BOARD,
    requestedBoardAction,
    succeededBoardAction,
} from "./board";
import {failedIconsAction, FETCHED_ICONS, requestedIconsAction, succeededIconsAction} from "./icons";
import {
    failedCategoriesAction,
    FETCHED_CATEGORIES,
    requestedCategoriesAction,
    succeededCategoriesAction
} from "./categories";
import {loaderAction} from "./flags";
import {errorMessageAction} from "./errors";

function* mySagaWatcher() {
    yield takeEvery(FETCHED_BOARD, boardsWorker);
    yield takeEvery(FETCHED_ICONS, iconsWorker);
    yield takeEvery(FETCHED_CATEGORIES, categoriesWorker);

}

function* iconsWorker() {
    try {
        yield put(loaderAction());
        yield put(requestedIconsAction);
        const json = yield call(() => dictionariesRequest('board-icons'));
        yield put(succeededIconsAction(json));
        yield put(errorMessageAction(''));
    } catch (error) {
        yield put(errorMessageAction(error.message));
        yield put(failedIconsAction());
    }
}

function* categoriesWorker() {
    try {
        yield put(requestedCategoriesAction);
        const json = yield call(() => dictionariesRequest('categories'));
        console.log(json);
        yield put(succeededCategoriesAction(json));
        yield put(errorMessageAction(''));
    } catch (error) {
        yield put(errorMessageAction(error.message));
        yield put(failedCategoriesAction());
    }
    finally {
        yield put(loaderAction());
    }
}

function* boardsWorker() {
    try {
        yield put(loaderAction());
        yield put(requestedBoardAction);
        const json = yield call(() => boardGetRequest());
        console.log(json);
        yield put(succeededBoardAction(json));
        yield put(errorMessageAction(''));
    } catch (error) {
        yield put(errorMessageAction(error.message));
        yield put(failedBoardAction());
    }
    finally {
        yield put(loaderAction());
    }
}

export default mySagaWatcher;
