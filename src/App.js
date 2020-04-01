import React from 'react';
import css from './App.module.css'
import {createBrowserHistory} from "history";
import {Switch, Redirect, Route, Router} from "react-router-dom";
import {Dashboard} from "./components/Dashboard/Dashboard";
import {SignIn} from "./components/SignIn/SignIn";
import {SignUp} from "./components/SignUp/SignUp";
import {CreateBoard} from "./components/CreateBoard/CreateBoard";
import {Preloader} from "./components/Preloader/Preloader";
import {Tasks} from "./components/Tasks/Tasks";

export const customHistory = createBrowserHistory();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            stateFetch: false
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("TOKEN");
        if (token) {
            this.onChangeFlag(true);
        }
    }

    onChangeFlag = (loggedIn) => {
        this.setState({loggedIn})
    };

    isFetching = (fetching) => {
        this.setState({
            stateFetch: fetching
        });
    };

    render() {
        return (
            <Router history={customHistory}>
                <div className={css.main}>
                    {this.state.loggedIn && <Switch>
                        <Route path='/dashboard' render={() => <Dashboard onChangeFlag={this.onChangeFlag}
                                                                          stateFetch={this.state.stateFetch}
                                                                          isFetching={this.isFetching}/>}/>
                        <Route path='/createBoard' render={() => <CreateBoard stateFetch={this.state.stateFetch}
                                                                              isFetching={this.isFetching}/>}/>
                        <Route path='/tasks' render={() => <Tasks stateFetch={this.state.stateFetch}
                                                                              isFetching={this.isFetching}/>}/>
                        <Redirect to='/dashboard'/>
                    </Switch>}
                    {!this.state.loggedIn && <Switch>
                        <Route path='/signIn'
                               render={() => <SignIn onChangeFlag={this.onChangeFlag} stateFetch={this.state.stateFetch}
                                                     isFetching={this.isFetching}/>}/>
                        <Route path='/signUp'
                               render={() => <SignUp onChangeFlag={this.onChangeFlag} stateFetch={this.state.stateFetch}
                                                     isFetching={this.isFetching}/>}/>
                        <Redirect to='/signIn'/>
                    </Switch>}
                </div>
            </Router>
        );
    }
}

export default App;