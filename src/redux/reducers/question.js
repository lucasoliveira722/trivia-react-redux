import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return { ...state, questions: action.payload.results };
  default:
    return state;
  }
}

export default questionsReducer;
