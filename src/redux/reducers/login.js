import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, name: action.payload.name, email: action.payload.email };
  default:
    return state;
  }
}

export default loginReducer;
