import {combineReducers} from "redux";
import board from './board.js';
import icons from "./icons";
import categories from "./categories";
import auth from "./auth";
import tasks from "./tasks";

export default combineReducers({
    board,
    icons,
    categories,
    auth,
    tasks
});
