const express = require('express');
const walletController = require("../controllers/wallets");

const router = express.Router()

router.post('/setup', walletController.setupWallet)
router.post('/transact/:walletId', walletController.transact)
router.get('/transactions', walletController.getTransactions)
router.get('/:id', walletController.getWallet)

module.exports = router