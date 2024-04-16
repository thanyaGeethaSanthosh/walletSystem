const dotenv = require('dotenv')

dotenv.config({ path: `${process.env.PWD}/.env` })

module.exports = {
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING
}
