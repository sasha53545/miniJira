import React from 'react';
import css from './App.module.css'
import {Switch, Redirect, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import CreateBoard from "./components/CreateBoard/CreateBoard";
import {Tasks} from "./components/Tasks/Tasks";
import {connect} from "react-redux";
import {loggedAction} from "./reducers/actions";

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

    render() {
        return (
            <div className={css.main}>
                {this.props.logged && <Switch>
                    <Route path='/dashboard' render={() => <Dashboard/>}/>
                    <Route path='/createBoard' render={() => <CreateBoard/>}/>
                    <Route path='/tasks' render={() => <Tasks/>}/>
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
        );
    }
}

export default connect(
    state => ({
        logged: state.flagsReducer.logged
    }),
    dispatch => ({
        loggedAction: () => dispatch(loggedAction())
    })
)(App);