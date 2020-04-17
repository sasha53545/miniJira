import {combineReducers} from "redux";
import boardsReducer from './boardsReducer.js';
import dictionariesReducer from './dictionariesReducer.js';
import flagsReducer from "./flagsReducer";
import errorsReducer from "./errorsReducer";

export default combineReducers({
    boardsReducer,
    dictionariesReducer,
    flagsReducer,
    errorsReducer
});