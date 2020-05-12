import React from "react";
import {useSelector} from "react-redux";
import {Error} from "../../../styledComponents/ErrorMessage";

function ErrorMessage() {
    const error = useSelector(state => state.auth.error || state.board.error || state.icons.error || state.categories.error);
    return (
        <Error>
            {error}
        </Error>
    );
}

export default ErrorMessage;
