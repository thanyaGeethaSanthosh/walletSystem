const express = require('express');
const walletController = require("../controllers/wallets");

const router = express.Router()

router.get('/:id', walletController.getWallet)
router.post('/setup', walletController.setupWallet)
router.post('/transact/:walletId', walletController.transact)
router.get('/transactions', walletController.getTransactions)

module.exports = router