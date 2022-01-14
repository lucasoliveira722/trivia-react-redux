import saveCartItems from './saveCartItems';

const TOKEN_BASE_URL = 'https://opentdb.com/api_token.php?command=request';
const questionsRequest = 'https://opentdb.com/api.php?amount=5&token=';

export const tokenFetch = async () => {
  const response = await fetch(TOKEN_BASE_URL);
  const responseJson = await response.json();
  const { token } = responseJson;
  saveCartItems(token);
  return token;
};

export async function getQuestionsAPI(token) {
  const questionsFetch = await fetch(`${questionsRequest}${token}`);
  const questionJson = await questionsFetch.json();
  if (questionJson.response_code === 0) {
    return questionJson;
  }
  getQuestionsAPI(tokenFetch());
}
