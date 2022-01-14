import { combineReducers } from 'redux';
import loginReducer from './login';
import token from './token';

const rootReducer = combineReducers({ loginReducer, token });

export default rootReducer;
