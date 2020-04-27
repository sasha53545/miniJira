import React from "react";
import css from './ErrorMessage.module.css';
import {connect, useSelector} from "react-redux";

function ErrorMessage() {
    const error = useSelector(state => state.auth.error || state.board.error || state.icons.error || state.categories.error);
    return (
        <div className={css.main}>
            {error}
        </div>
    );
}

export default ErrorMessage;
