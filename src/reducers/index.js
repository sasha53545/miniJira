import {combineReducers} from "redux";
import board from './board.js';
import flags from "./flags";
import errors from "./errors";
import icons from "./icons";
import categories from "./categories";

export default combineReducers({
    board,
    icons,
    categories,
    flags,
    errors
});