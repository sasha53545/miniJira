import React from "react";
import css from './ErrorMessage.module.css';
import {connect} from "react-redux";

function ErrorMessage(props) {
    return (
        <div className={css.main}>
            {props.error}
        </div>
    );
}

export default connect(
    state => ({
        error: state.board.error || state.auth.error || state.categories.error || state.icons.error
    })
)(ErrorMessage);
