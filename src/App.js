import React from 'react';
import css from './App.module.css'
import Dashboard from "./components/Dashboard/Dashboard";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import CreateBoard from "./components/CreateBoard/CreateBoard";
import {Tasks} from "./components/Tasks/Tasks";
import {connect} from "react-redux";
import {authState} from "./reducers/auth";
import {Redirect, Route, Router, Switch} from "react-router-dom";

class App extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem("TOKEN");
        if (token) {
            this.props.authState();
        }
    }

    render() {
        return (
            <div className={css.main}>
                {this.props.isAuth && <Switch>
                    <Route path='/dashboard' render={() => <Dashboard/>}/>
                    <Route path='/createBoard' render={() => <CreateBoard/>}/>
                    <Route path='/tasks' render={() => <Tasks/>}/>
                    <Redirect to='/dashboard'/>
                </Switch>}
                {!this.props.isAuth && <Switch>
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
        isAuth: state.auth.authState
    }),
    {
        authState
    }
)(App);
