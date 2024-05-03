const mongoose = require('mongoose')

const WalletSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  balance: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Wallet', WalletSchema)
