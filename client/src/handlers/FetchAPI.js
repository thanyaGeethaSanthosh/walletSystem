import { PATH } from '../values/constants';

const postReq = (url, data) => {
  return fetch(`${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

const callCreateWallet = async ({ username, balance }) => {
  const response = await postReq(`/${PATH}/setup`, { name: username, balance });//TODO: add username too
  return response.json();
};
const callCreateTransaction = async ({ walletId, amount, description }) => {
  const response = await postReq(`/${PATH}/transact/${walletId}`, { amount, description });
  return response.json();
};

const getWallet = async (walletId) => {
  const response = await fetch(`/${PATH}/wallet/${walletId}`);
  return response.json();
};

const getTransactions = async (walletId, skip, limit, sort) => {
  const response = await fetch(`/${PATH}/transactions?walletId=${walletId}&skip=${skip}&limit=${limit}${sort ? "&sort=" + sort : ""}`);
  return response.json();
};

const getAllTransactions = async (walletId) => {
  const response = await fetch(`/${PATH}/transactions?walletId=${walletId}`);
  return response.json();
};

const FetchAPI = {
  callCreateWallet,
  getWallet,
  getTransactions,
  getAllTransactions,
  callCreateTransaction
};

export default FetchAPI