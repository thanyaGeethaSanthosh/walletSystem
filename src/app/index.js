const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')

const wallets = require('./routes/wallets')
const env = require('./config/env')

mongoose.connect(env.DB_CONNECTION_STRING).then(() => console.log('Connected to DB!'))

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.use('/api/wallets', wallets)

module.exports = app
