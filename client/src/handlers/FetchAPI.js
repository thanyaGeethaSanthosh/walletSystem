import { PATH } from '../values/constants';

const postReq = (url, data) => {
  return fetch(`${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

const callCreateWallet = async ({ walletName, balance }) => {
  const response = await postReq(`/${PATH}/setup`, { name: walletName, balance });//TODO: add username too
  return response.json();
};

const getWallet = async (walletId) => {
  const response = await fetch(`/${PATH}/wallet/${walletId}`);
  return response.json();
};

const getTransactions = async (walletId, skip, limit) => {
  const response = await fetch(`/${PATH}/transactions?walletId=${walletId}&skip=${skip}&limit=${limit}`);
  return response.json();
};

const FetchAPI = {
  callCreateWallet,
  getWallet,
  getTransactions,
};

export default FetchAPI