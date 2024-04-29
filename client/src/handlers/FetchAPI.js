import { PATH } from '../values/constants';

const postReq = (url, data) => {
  return fetch(`${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

const Register = (data) => {
  return postReq('api/signUp', data);
};

const getTransactions = async (walletId, skip, limit) => {
  const response = await fetch(`/${PATH}/transactions?walletId=${walletId}&skip=${skip}&limit=${limit}`);
  return response.json();
};

const FetchAPI = {
  Register,
  getTransactions,
};

export default FetchAPI