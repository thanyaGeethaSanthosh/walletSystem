const express = require('express')
const logger = require('morgan');

const wallets = require('./routes/wallets')

const app = express()

app.use(logger('dev'));
app.use(express.json());

app.use('/api/wallets', wallets)


module.exports = app