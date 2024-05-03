# Wallet System

### Inportant URL
UI URL: https://wallet-system-kohl.vercel.app/
API URL: https://wallet-system-kohl.vercel.app/api/Wallets
Recording with explanation: https://www.loom.com/share/d9363f7ef82b4eb29b723f09c82602d4?sid=ee2b3304-8465-4b65-8c25-0f2217784859

### Supported operations

This project implements a backend service and a simple 2-page web application for a wallet system. The backend offers functionalities for:

Wallet Setup: Creates a new wallet with an initial balance and name (optional).
Credit/Debit Transactions: Adds or removes funds from a wallet with a description.
Fetching Transactions: Retrieves a paginated list of recent transactions for a specific wallet.
Get Wallet Details: Retrieves the current balance and name of a wallet.
Backend APIs

#### 1. Initialize Wallet (POST /setup)

##### Request url:
 https://wallet-system-kohl.vercel.app/api/Wallets/setup
##### Request Body:

```
{
  "balance": 10.5612, // Decimal balance up to 4 precision points
  "name": "My Wallet"  // Optional, defaults to "Wallet"
}
```

##### Response Body (Successful):
```
{
  "id": "1234567890abcdef", // System-generated wallet ID
  "balance": 10.5612,
  "transactionId": "4349349843", // System-generated transaction ID
  "name": "My Wallet",
  "date": "2024-05-03T11:41:00.000Z" // ISO-8601 formatted date
}
```
#### 2. Credit/Debit Amount (POST /transact/:walletId)

##### Request url: 
https://wallet-system-kohl.vercel.app/api/Wallets/Transact/<walletId>
##### Path parameters
Wallet Id: the wallet's id generated
##### Request Body:
```
{
  "amount": 10.0045, // Decimal amount up to 4 precision points (positive for credit, negative for debit)
  "description": "Salary"
}
```

##### Response Body (Successful):
```
{
  "balance": 20.5657, // Updated balance after transaction
  "transactionId": "8328832323" // System-generated transaction ID
}
```

#### 3. Fetch Transactions (GET /transactions?walletId={walletId}&skip={skip}&limit={limit})

##### Request url:
 https://wallet-system-kohl.vercel.app/api/wallets/transactions?walletId=<walletId>&skip=<skip>&limit=<limit>
##### Query parameters:
Wallet Id: the wallet's id generated
skip (Optional): Number of transactions to skip (pagination)
limit (Optional): Maximum number of transactions to return (pagination)
##### Response Body (Successful):
```
[
  {
    "id": "1234567890abcdef",
    "walletId": "1234567890abcdef",
    "amount": 10.0045,
    "balance": 20.5657,
    "description": "Salary",
    "date": "2024-05-03T11:41:00.000Z",
    "type": "CREDIT"
  },
  // ... (other transactions, if applicable)
]
```
#### 4. Get Wallet Details (GET /wallet/:id)

##### Request url:
https://wallet-system-kohl.vercel.app/api/Wallets/wallet/<walletId>
##### Path Parameter: 
id (ID of the wallet)
##### Response Body (Successful):
```
{
  "id": "1234567890abcdef",
  "balance": 20.5657,
  "name": "My Wallet",
  "date": "2024-05-03T11:41:00.000Z" // Date of wallet creation
}
```

## Frontend Web App

The web application comprises two pages:

### 1. Wallet Setup and Overview

Prompts the user for a username (optional) and initial balance (optional) for wallet creation.
Submitting the form triggers a request to the /setup API to create a new wallet.
Upon successful creation, the wallet ID is stored in local storage for future reference.
Displays the current wallet balance and name.

### 2. Transactions

Once you create a wallet and add some transactions, all the transactions would be listed in this page. You can sort based on amount or date. you can export transactions to a csv file.