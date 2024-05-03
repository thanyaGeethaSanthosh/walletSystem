const walletService = require('../services/wallets')
const logger = require('../utility/logger')
const { errorHandler, ValidationError } = require('../utility/error')

const getWallet = async (req, res) => {
  try {
    const { id } = req.params
    const wallet = await walletService.getWallet(id)
    res.json(wallet)
  } catch (err) {
    logger.info('error in getWallet')
    errorHandler(res, err)
  }
}

const setupWallet = async (req, res) => {
  try {
    const { name, balance } = req.body
    const wallet = await walletService.setupWallet(name, balance)
    res.json(wallet)
  } catch (err) {
    logger.info('error in setupWallet')
    errorHandler(res, err)
  }
}

const transact = async (req, res) => {
  try {
    const { walletId } = req.params
    const { amount, description } = req.body
    const parsedAmount = parseInt(amount)
    if (isNaN(parsedAmount)) {
      throw new ValidationError('please provide a valid amount')
    }
    const wallet = await walletService.transact(walletId, parsedAmount, description)
    res.json(wallet)
  } catch (err) {
    logger.info('error in transact')
    errorHandler(res, err)
  }
}

const getTransactions = async (req, res) => {
  try {
    const { walletId, skip, limit, sort } = req.query
    if (!walletId) {
      throw new ValidationError('Wallet id is required to get Transactions. Please provide a valid wallet Id')
    }
    const wallet = await walletService.getTransactions(walletId, skip, limit, sort)
    res.json(wallet)
  } catch (err) {
    logger.info('error in getTransactions')
    errorHandler(res, err)
  }
}

module.exports = {
  getWallet,
  setupWallet,
  transact,
  getTransactions
}
