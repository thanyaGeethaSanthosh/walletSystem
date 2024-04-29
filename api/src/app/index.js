const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const path = require('path')

const wallets = require('./routes/wallets')
const env = require('./config/env')

mongoose.connect(env.DB_CONNECTION_STRING).then(() => console.log('Connected to DB!'))

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../../../build')))
app.use('/api/wallets', wallets)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../build', 'index.html'))
})

module.exports = app
