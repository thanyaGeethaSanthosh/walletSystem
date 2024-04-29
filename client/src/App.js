import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WalletCreationForm from './components/WalletCreationForm';
import Transactions from './components/Transactions';
import FetchAPI from './handlers/FetchAPI';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/transactions" element={<Transactions walletId={"661ec5e0b0317693c5e3f5cb"} FetchAPI={FetchAPI} />} />
        <Route path="/" element={<WalletCreationForm/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;