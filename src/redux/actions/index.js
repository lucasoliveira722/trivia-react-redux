// import { getQuestionsAPI } from '../../services';
import { newFunc } from '../../services/index';

export const LOGIN = 'LOGIN';
export const ADD_TOKEN = 'ADD_TOKEN';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SET_DATA = 'SET_DATA';

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

export const setDataPlayers = (payload) => ({
  type: SET_DATA,
  payload,
});

export const getQuestionsFromAPI = (token) => async (dispatch) => {
  try {
    const getQuestions = await newFunc(token);
    dispatch(saveQuestions(getQuestions));
  } catch (error) {
    console.error(error);
  }
};
