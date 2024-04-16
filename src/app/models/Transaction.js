const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Wallet'
  },
  amount: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
    enum: ['CREDIT', 'DEBIT']
  }
})

module.exports = mongoose.model('Transaction', TransactionSchema)
