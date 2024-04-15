const walletService = require('../services/wallets')

const getWallet = async (req, res) => {
  try {
    const {id} = req.params
    const wallet = await walletService.getWallet(id)
    res.json(wallet)
  } catch (err) {
    res.status(500).send(err)
  }
}

const setupWallet = async (req, res) => {
  try {
    const {name, balance} = req.body
    const wallet = await walletService.setupWallet(name, balance)
    res.json(wallet)
  } catch (err) {
    res.status(500).send(err)
  }
}

const transact = async (req, res) => {
  try {
    const {walletId} = req.params
    const {amount, description} = req.body
    const wallet = await walletService.transact(walletId, amount, description)
    res.json(wallet)
  } catch (err) {
    res.status(500).send(err)
  }
}

const getTransactions = async (req, res) => {
  try {
    const {walletId, skip, limit} = req.query
    const wallet = await walletService.getTransactions(walletId, skip, limit)
    res.json(wallet)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getWallet,
  setupWallet,
  transact,
  getTransactions
}