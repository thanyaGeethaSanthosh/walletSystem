const getWallet = async (id) => {
  return {
    id: id,
    balance: 3000,
    name: 'My wallet',
    date: 'date'
  }
}

const setupWallet = async (name, balance) => {
  return {
    id: '123abc',
    balance: balance,
    transactionId: '4349349843',
    name: name,
    date: 'date'
  }
}

const transact = async (walletId, amount, description) => {
  return {
    balance: 2000,
    transactionId: '8328832323'
  }
}

const getTransactions = async (walletId, skip, limit) => {
  return [
    {
      id: '333ccc',
      walletId: '123abc',
      amount: -250,
      balance: 2250,
      description: 'Film tickets',
      date: 'date',
      type: 'DEBIT'
    },
    {
      id: '444ccc',
      walletId: '123abc',
      amount: -20,
      balance: 2230,
      description: 'Tea',
      date: 'date',
      type: 'DEBIT'
    },
    {
      id: '555ccc',
      walletId: '123abc',
      amount: 5000,
      balance: 7230,
      description: 'Loaned',
      date: 'date',
      type: 'CREDIT'
    },
  ]
}

module.exports = {
  getWallet,
  setupWallet,
  transact,
  getTransactions
}