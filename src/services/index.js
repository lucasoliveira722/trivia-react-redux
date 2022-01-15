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
  // if (questionJson.response_code === 0) {
  //   console.log(questionJson);
  return questionJson;
  // }
  // getQuestionsAPI(tokenFetch());
}

export async function newFunc() {
  const magicNumber = 3;
  const token = localStorage.getItem('token');
  let request = await getQuestionsAPI(token);
  if (request.response_code === magicNumber) {
    const newToken = await tokenFetch();
    request = await getQuestionsAPI(newToken);
  }
  return request;
}
