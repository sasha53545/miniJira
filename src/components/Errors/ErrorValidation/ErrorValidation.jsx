import React from "react";
import css from './ErrorValidation.module.css'
import ErrorValidationIcon from "../../../svg/ErrorValidationIcon";

function ErrorValidation(props) {
    return (
        <div className={css.main}>
            <div className={css.svg_block}>
                <ErrorValidationIcon/>
                <div className={css.block}>
                {props.error}
                </div>
            </div>
        </div>
    )
}

export default ErrorValidation;