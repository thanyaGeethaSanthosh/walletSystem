const request = require('supertest');
const app = require("../../src/app");


describe('/api/wallets', () => {
  describe('GET /', () => {
    it('Should get the wallet information matching to the given ID', (done) => {
      const expectedWalletResponse = {id: 'abc123', balance: 3000, name: 'My wallet', date: 'date'};

      request(app)
      .get('/api/wallets/abc123')
      .expect(200)
      .expect(expectedWalletResponse, done)
    })
  })

  describe('POST /setup', () => {
    it('Should setup a new wallet with given name and balance', (done) => {
      const expectedWalletResponse = {id: '123abc', balance: 3000, transactionId: '4349349843', name: 'My wallet', date: 'date'};

      request(app)
      .post('/api/wallets/setup')
      .send({name: 'My wallet', balance: 3000})
      .expect(200)
      .expect(expectedWalletResponse, done)
    })
  })

  describe('POST /transact', () => {
    it('Should create a new transaction in the given wallet with given amount and description', (done) => {
      const expectedTransactResponse = {balance: 2000, transactionId: '8328832323'};

      request(app)
      .post('/api/wallets/transact/abc123')
      .send({description: 'Travel', amount: 250})
      .expect(200)
      .expect(expectedTransactResponse, done)
    })
  })

  describe('GET /transactions', () => {
    it('Should get the all the transactions for given wallet ID', (done) => {
      const expectedTransactionsResponse = [
        {id: '333ccc', walletId: '123abc', amount: -250, balance: 2250, description: 'Film tickets', date: 'date', type: 'DEBIT'},
        {id: '444ccc', walletId: '123abc', amount: -20, balance: 2230, description: 'Tea', date: 'date', type: 'DEBIT'},
        {id: '555ccc', walletId: '123abc', amount: 5000, balance: 7230, description: 'Loaned', date: 'date', type: 'CREDIT'},
      ];

      request(app)
      .get('/api/wallets/transactions')
      .expect(200)
      .expect(expectedTransactionsResponse, done)
    })
  })
})