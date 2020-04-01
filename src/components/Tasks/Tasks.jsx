import React from "react";
import css from './Tasks.module.css';
import {Preloader} from "../Preloader/Preloader";

export class Tasks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div>
                {(this.props.stateFetch === true) ?
                    <Preloader/> :
                    <div className={css.tasks}>
                        <header className={css.header}>
                            <div>
                                <h1>MiniJira</h1>
                            </div>
                            <div onClick={this.onLogout}>
                                Log Out
                            </div>
                        </header>
                        <main className={css.main}>
                            tasks
                        </main>
                    </div>
                }
            </div>
        );
    }
}