import React from "react";
import css from './ErrorValidation.module.css'
import {errorValidationIcon} from "../../../images/svg";

export function ErrorValidation(props) {
    return (
        <div className={css.main}>
            <div className={css.svg_block}>
                {errorValidationIcon()}
                <div className={css.block}>
                {props.error}
                </div>
            </div>
        </div>
    )
}
