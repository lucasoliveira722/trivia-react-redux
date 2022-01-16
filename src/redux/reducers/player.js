import { SET_DATA } from '../actions';

const INITIAL_STATE = {
  nome: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_DATA:
    return action.payload;
  default:
    return state;
  }
};

export default player;
