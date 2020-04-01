import React from "react";
import css from './ErrorMessage.module.css';

export function ErrorMessage(props) {
    return (
        <div className={css.main}>
            {props.error}
        </div>
    );
}