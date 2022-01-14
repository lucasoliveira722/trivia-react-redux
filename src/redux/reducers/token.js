import { ADD_TOKEN } from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return {
      token: action.payload,
    };
  default:
    return state;
  }
};

export default token;
