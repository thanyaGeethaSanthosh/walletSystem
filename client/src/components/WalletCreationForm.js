
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../values/colors';
import TitleText from './TitleText';
import Spinner from './Spinner';
import WalletDetails from './WalletDetails';
import InputText from './InputText';
import CommonButton from './CommonButton';
import LinkButton from './LinkButton';

const StyledFormBody = styled.div`
font-family: 'Lato', sans-serif;
color: ${COLORS.dark2};
position: relative;
width: 500px;
margin: 50px auto 100px auto;
`
const ErrorMessage = styled.div`
font-family: 'Lato', sans-serif;
font-size: 1em;
width: 470px;
height: 50px;
padding: 0px 15px 0px 15px;
outline: none;
color: ${COLORS.red};
`


function WalletCreationForm(props) {
  const { FetchAPI } = props
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdWalletId, setCreatedWalletId] = useState(null);
  const [username, setUsername] = useState("");
  const [walletName, setWalletName] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (createdWalletId) {
      localStorage.setItem('walletId', createdWalletId);
    }
    const walletIdInLocalStorage = localStorage.getItem('walletId');
    if (walletIdInLocalStorage) {
      setCreatedWalletId(walletIdInLocalStorage)
    }
  }, [createdWalletId]);


  const create = () => {
    if (!username || !walletName) {
      setErrorMessage("userName and walletName are required to create a wallet")
      setTimeout(() => {
        setErrorMessage("")
      }, 5000);
      return;
    }
    setLoading(true)
    const fetchData = async () => {
      try {
        const result = await FetchAPI.callCreateWallet({ username, walletName, balance })
        if (result?.id) {
          setCreatedWalletId(result.id);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  if (loading) {
    return <Spinner />;
  }
  else if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (createdWalletId) {
    return (<WalletDetails walletId={createdWalletId} FetchAPI={FetchAPI} />)
  }

  return (
    <>
      <LinkButton text="Go to Transactions" path="/transactions" />
      <StyledFormBody>
        <TitleText title="Wallet System" />
        <InputText id="username" name="USERNAME" value={username} setValue={setUsername} />
        <InputText id="walletName" name="WALLET NAME" value={walletName} setValue={setWalletName} />
        <InputText id="balance" name="INITIAL BALANCE" value={balance} setValue={setBalance} />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <CommonButton id={"submit"} onClickFunction={create} text={"Create Wallet"} />
      </StyledFormBody>
    </>
  )
}

export default WalletCreationForm;
