import React from "react";
import css from './ErrorMessage.module.css';
import {connect} from "react-redux";

function ErrorMessage(props) {
    return (
        <div className={css.main}>
            {props.errorMessage}
        </div>
    );
}

export default connect(
    state => ({errorMessage: state.errorsReducer.errorMessage})
)(ErrorMessage);