import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import WalletCreationForm from './components/WalletCreationForm';
import WalletDetails from './components/WalletDetails';
import Transactions from './components/Transactions';
import FetchAPI from './handlers/FetchAPI';

const App = () => {
  const [walletId, setWalletId] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    const walletIdInLocalStorage = localStorage.getItem('walletId');
    setWalletId(walletIdInLocalStorage)
  }, [walletId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/transactions" element={walletId ? <Transactions walletId={"661ec5e0b0317693c5e3f5cb"} FetchAPI={FetchAPI} /> : navigate('/')} />
        <Route path="/" element={walletId ? <WalletDetails walletId={walletId} FetchAPI={FetchAPI} /> : <WalletCreationForm FetchAPI={FetchAPI} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;