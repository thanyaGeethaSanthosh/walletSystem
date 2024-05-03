const Wallet = require('../models/Wallet')
const Transaction = require('../models/Transaction')
const { ResourceNotFoundError } = require('../utility/error')
const logger = require('../utility/logger')

const getWallet = async (id) => {
  try {
    const wallet = await Wallet.findById(id)
    return {
      id: wallet._id,
      balance: wallet.balance,
      name: wallet.name,
      date: wallet.date
    }
  } catch (error) {
    logger.info(error instanceof Error)
    throw new ResourceNotFoundError('Wallet id provided is invalid please provide a valid wallet Id')
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
  const roundedAmount = Number(amount.toFixed(4))
  const walletEntry = await Wallet.findOneAndUpdate(
    { _id: walletId },
    { $inc: { balance: roundedAmount } },
    { new: true }
  )
  const transaction = new Transaction({
    description,
    walletId,
    amount: roundedAmount,
    balance: walletEntry.balance,
    type: amount > 0 ? 'CREDIT' : 'DEBIT' // TODO: need to decide what to do when it is 0, should we ignore or throw error
  })
  const transactionEntry = await transaction.save()
  return {
    id: transactionEntry._id,
    walletId: walletEntry._id,
    amount: transaction.amount,
    balance: walletEntry.balance,
    description: transaction.description,
    date: transaction.date,
    type: transaction.type
  }
}

const getTransactions = async (walletId, skip, limit) => {
  const transactions = await Transaction.find({ walletId }).skip(skip || 0)
    .limit(limit || 0)

  const transactionsResponse = transactions.map(({ _id, description, walletId, amount, balance, type, date }) => {
    return { id: _id, description, walletId, amount, balance, type, date }
  })
  return transactionsResponse
}

module.exports = {
  getWallet,
  setupWallet,
  transact,
  getTransactions
}
