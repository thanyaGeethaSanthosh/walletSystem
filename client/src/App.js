import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WalletCreationForm from './components/WalletCreationForm';
import Transactions from './components/Transactions';
import FetchAPI from './handlers/FetchAPI';

const App = () => {
  const [walletId, setWalletId] = useState("")
  useEffect(() => {
    const walletIdInLocalStorage = localStorage.getItem('walletId');
    if (walletIdInLocalStorage) {
      setWalletId(walletIdInLocalStorage)
    }
  }, [walletId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/transactions" element={walletId ? <Transactions walletId={walletId} FetchAPI={FetchAPI} /> :  <Navigate to="/" replace={true} />} />
        <Route path="/" element={<WalletCreationForm FetchAPI={FetchAPI} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;