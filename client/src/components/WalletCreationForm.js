
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../values/colors';
import TitleText from './TitleText';
import Spinner from './Spinner';
import WalletDetails from './WalletDetails';
import InputText from './InputText';
import CommonButton from './CommonButton';

const StyledFormBody = styled.div`
font-family: 'Lato', sans-serif;
color: ${COLORS.dark2};
position: relative;
width: 500px;
margin: 50px auto 100px auto;
display: flex;
flex-direction: column;
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
  const { FetchAPI, walletId, setWalletId } = props
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (walletId) {
      localStorage.setItem('walletId', walletId);
    }
    const walletIdInLocalStorage = localStorage.getItem('walletId');
    if (walletIdInLocalStorage) {
      setWalletId(walletIdInLocalStorage)
    }
  }, [setWalletId, walletId]);


  const create = () => {
    if (!username) {
      setErrorMessage("userName is required to create a wallet")
      setTimeout(() => {
        setErrorMessage("")
      }, 5000);
      return;
    }
    setLoading(true)
    const fetchData = async () => {
      try {
        const result = await FetchAPI.callCreateWallet({ username, balance })
        if (result?.id) {
          setWalletId(result.id);
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
  if (walletId) {
    return (<WalletDetails walletId={walletId} FetchAPI={FetchAPI} />)
  }

  return (
    <>
      <StyledFormBody>
        <TitleText title="Wallet System" />
        <InputText id="username" name="USERNAME" value={username} setValue={setUsername} />
        <InputText id="balance" name="INITIAL BALANCE" value={balance} setValue={setBalance} />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <CommonButton id={"submit"} onClickFunction={create} text={"Create Wallet"} />
      </StyledFormBody>
    </>
  )
}

export default WalletCreationForm;
