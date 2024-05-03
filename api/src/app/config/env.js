const dotenv = require('dotenv')
const path = require('path')
const logger = require('../utility/logger')

try {
  dotenv.config({ path: path.resolve(__dirname, '../.env') })
} catch (error) {
  logger.error('Error loading .env file:', error)
}

module.exports = {
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING
}
