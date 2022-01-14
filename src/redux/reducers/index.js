import { combineReducers } from 'redux';
import loginReducer from './login';
import questionsReducer from './question';
import token from './token';

const rootReducer = combineReducers({ loginReducer, token, questionsReducer });

export default rootReducer;
