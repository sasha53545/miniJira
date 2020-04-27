import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import reducer from './reducers';
import {createBrowserHistory} from "history";
import mySagaWatcher from "./reducers/sagas";
import {Router} from "react-router-dom";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";

export const customHistory = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(),  sagaMiddleware],
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
});

sagaMiddleware.run(mySagaWatcher);

ReactDOM.render(
    <Provider store={store}>
        <Router history={customHistory}>
        <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);