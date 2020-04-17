import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import {createStore} from "redux";
import reducer from "./reducers";
import {applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {Router} from "react-router-dom";

export const store = createStore(reducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export const customHistory = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={customHistory}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

