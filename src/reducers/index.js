import {combineReducers} from "redux";
import boardsReducer from './boardsReducer.js';
import dictionariesReducer from './dictionariesReducer.js';

export default combineReducers({
    boardsReducer,
    dictionariesReducer
});