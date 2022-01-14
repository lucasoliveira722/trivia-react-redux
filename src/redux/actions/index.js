export const LOGIN = 'LOGIN';
export const ADD_TOKEN = 'ADD_TOKEN';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const setAddToken = (payload) => ({
  type: ADD_TOKEN,
  payload,
});
