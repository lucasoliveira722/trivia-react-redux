import { combineReducers } from 'redux';
import loginReducer from './login';
import questionsReducer from './question';
import token from './token';
import player from './player';

const rootReducer = combineReducers({ loginReducer, token, questionsReducer, player });

export default rootReducer;
