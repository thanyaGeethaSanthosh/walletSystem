const Wallet = require('../models/Wallet')
const Transaction = require('../models/Transaction')

const getWallet = async (id) => {
  return {
    id,
    balance: 3000,
    name: 'My wallet',
    date: 'date'
  }
}

const setupWallet = async (name, balance) => {
  const wallet = new Wallet({
    name,
    balance
  })
  const walletEntry = await wallet.save()
  const transaction = new Transaction({
    description: 'Created wallet',
    walletId: walletEntry._id,
    amount: walletEntry.balance,
    balance: walletEntry.balance,
    type: 'CREDIT'
  })
  const transactionEntry = await transaction.save()
  return {
    id: walletEntry._id,
    balance: walletEntry.balance,
    transactionId: transactionEntry._id,
    name: walletEntry.name,
    date: walletEntry.date
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
    }
  ]
}

module.exports = {
  getWallet,
  setupWallet,
  transact,
  getTransactions
}
