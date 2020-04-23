import React from 'react';
import css from './App.module.css'
import {Switch, Redirect, Route, Router} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import CreateBoard from "./components/CreateBoard/CreateBoard";
import {Tasks} from "./components/Tasks/Tasks";
import {connect} from "react-redux";
import mySagaWatcher from "./reducers/sagas";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {logged} from "./reducers/flags";


export const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, compose(applyMiddleware(thunk, sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export const customHistory = createBrowserHistory();
sagaMiddleware.run(mySagaWatcher);

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const token = localStorage.getItem("TOKEN");
        if (token) {
            this.props.loggedAction();
        }
    }

    onLogout = () => {
        localStorage.removeItem('TOKEN');
        this.props.logged();
        customHistory.push('/signIn')
    };

    render() {
        return (
            <Router history={customHistory}>
                <div className={css.main}>
                    {this.props.logged && <Switch>
                        <Route path='/dashboard' render={() => <Dashboard onLogout={this.onLogout}/>}/>
                        <Route path='/createBoard' render={() => <CreateBoard onLogout={this.onLogout}/>}/>
                        <Route path='/tasks' render={() => <Tasks onLogout={this.onLogout}/>}/>
                        <Redirect to='/dashboard'/>
                    </Switch>}
                    {!this.props.logged && <Switch>
                        <Route path='/signIn'
                               render={() => <SignIn/>}/>
                        <Route path='/signUp'
                               render={() => <SignUp/>}/>
                        <Redirect to='/signIn'/>
                    </Switch>}
                </div>
            </Router>
        );
    }
}

export default connect(
    state => ({
        logged: state.flags.logged
    }),
    {
        logged
    }
)(App);
