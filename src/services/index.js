import saveCartItems from './saveCartItems';

const TOKEN_BASE_URL = 'https://opentdb.com/api_token.php?command=request';

const tokenFetch = async () => {
  const response = await fetch(TOKEN_BASE_URL);
  const responseJson = await response.json();
  const { token } = responseJson;
  saveCartItems(token);
  return token;
};

export default tokenFetch;
