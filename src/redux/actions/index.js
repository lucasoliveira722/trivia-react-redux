import { getQuestionsAPI } from '../../services';

export const LOGIN = 'LOGIN';
export const ADD_TOKEN = 'ADD_TOKEN';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const setAddToken = (payload) => ({
  type: ADD_TOKEN,
  payload,
});

export const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});

export const getQuestionsFromAPI = (token) => async (dispatch) => {
  try {
    const getQuestions = await getQuestionsAPI(token);
    dispatch(saveQuestions(getQuestions));
  } catch (error) {
    console.error(error);
  }
};
