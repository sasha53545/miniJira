import React from "react";
import css from './Preloader.module.css';

export function Preloader(props) {
    return (
        <div className={css.main}>
            <div className={css.container}>
                <div className={css.ob}></div>
                <div className={css.ob}></div>
                <div className={css.ob}></div>
                <div className={css.ob}></div>
                <div className={css.ob}></div>
                <div className={css.ob}></div>
                <div className={css.ob}></div>
                <div className={css.ob}></div>
                <div className={css.ob}></div>
                <div className={css.ob}></div>
            </div>
        </div>
    );
}