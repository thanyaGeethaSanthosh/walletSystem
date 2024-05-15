const request = require('supertest')
const sinon = require('sinon')
const app = require('../../src/app')
const walletService = require('../../src/app/services/wallets')

describe('/api/wallets', () => {
  let mockGetWallet, mockCreateWallet, mockAddTransaction, mockGetTransactions
  const transactionId = '123'
  const walletId = '123abc'
  const createWalletBody = { name: 'user name', balance: 20 }
  const getWalletData = { id: walletId, date: 'date', ...createWalletBody }
  const addTransactionBody = { amount: -200, description: 'travel' }
  const addedTransaction = { id: transactionId, walletId, amount: -200, description: 'travel' }
  const getTransactionsResponse = [
    { id: '333ccc', walletId, amount: -250, balance: 2250, description: 'Film tickets', date: 'date', type: 'DEBIT' },
    { id: '444ccc', walletId, amount: -20, balance: 2230, description: 'Tea', date: 'date', type: 'DEBIT' },
    { id: '555ccc', walletId, amount: 5000, balance: 7230, description: 'Loaned', date: 'date', type: 'CREDIT' },
    { ...addedTransaction }
  ]
  before(() => {
    mockCreateWallet = sinon.stub(walletService, 'setupWallet')
    mockCreateWallet.resolves({ ...getWalletData })
    mockGetWallet = sinon.stub(walletService, 'getWallet')
    mockGetWallet.resolves({ ...getWalletData })
    mockAddTransaction = sinon.stub(walletService, 'transact')
    mockAddTransaction.resolves({ ...addedTransaction })
    mockGetTransactions = sinon.stub(walletService, 'getTransactions')
    mockGetTransactions.resolves(getTransactionsResponse)
  })

  after(() => {
    // Restore the stub after all tests
    mockGetWallet.restore()
    mockCreateWallet.restore()
    mockAddTransaction.restore()
    mockGetTransactions.restore()
  })

  describe('POST /setup', () => {
    it('Should setup a new wallet with given name and balance', (done) => {
      request(app)
        .post('/api/wallets/setup')
        .send(createWalletBody)
        .expect(200)
        .expect({ ...getWalletData }, done)
    })
  })

  describe('GET /:id', () => {
    it('Should get the wallet information matching to the given ID', (done) => {
      request(app)
        .get(`/api/wallets/wallet/${walletId}`)
        .expect(200)
        .expect({ ...getWalletData }, done)
    })
  })

  describe('POST /transact', () => {
    it('Should create a new transaction in the given wallet with given amount and description', (done) => {
      request(app)
        .post(`/api/wallets/transact/${walletId}`)
        .send(addTransactionBody)
        .expect(200)
        .expect({ ...addedTransaction }, done)
    })
  })

  describe('GET /transactions', () => {
    it('Should get the all the transactions for given wallet ID', (done) => {
      request(app)
        .get(`/api/wallets/transactions?walletId=${walletId}`)
        .expect(200)
        .expect(getTransactionsResponse, done)
    })
  })
})
