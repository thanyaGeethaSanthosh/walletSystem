import React, { useState } from 'react';
import styled from 'styled-components';
import COLORS from '../values/colors';
import CommonButton from './CommonButton';
import InputText from './InputText';
import Spinner from './Spinner';

const ErrorMessage = styled.div`
font-family: 'Lato', sans-serif;
font-size: 1em;
width: 90%;
height: 50px;
padding: 0px 15px 0px 15px;
outline: none;
color: ${COLORS.red};
`

const PopUpContent = styled.div`
  width: 320px;
  align-items: center;
  background-color:${COLORS.light1};
  color: ${COLORS.dark2};
  text-align: center;
  border-radius: 20px;
  padding: 30px 30px 70px;
  position: absolute;
  top: 50%;
  left: 50%;
   z-index: 1000;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.button`
 width: 30px;
    font-size: 20px;
    color: #c0c5cb;
    position: fixed;
    top: 25px;
    right: 25px;
    background-color: transparent;
    border: none;
    margin-bottom: 10px;
`
const BlurredBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5); 
  backdrop-filter: blur(5px);
  z-index: 999;
`;

const SpaceSaver = styled.div`
width:100%;
height: 30px;
`


const TransactionCreationPopup = (props) => {
  const { setIsPopUpVisible, FetchAPI, setError, walletId } = props
  const [errorMessage, setErrorMessage] = useState("")
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const create = () => {
    if (!amount || !description) {
      setErrorMessage("amount and description are required to create a transaction")
      setTimeout(() => {
        setErrorMessage("")
      }, 5000);
      return;
    }
    setLoading(true)
    const createTransaction = async () => {
      try {
        await FetchAPI.callCreateTransaction({ walletId: walletId, amount, description })
        setIsPopUpVisible(false)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    createTransaction();
  };

  return (
    <BlurredBackground>
      <PopUpContent id="cookiesPopup">
        <SpaceSaver>
          <CloseButton className="close" onClick={() => setIsPopUpVisible(false)}>✖</CloseButton>
        </SpaceSaver>
        {loading ? (<Spinner />) : (
          <>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <InputText id="amount" name="AMOUNT" value={amount} setValue={setAmount} />
            <InputText id="description" name="DESCRIPTION" value={description} setValue={setDescription} />
            <CommonButton id={"popup1"} onClickFunction={create} text={"add a transaction"} />
          </>
        )}
      </PopUpContent>
    </BlurredBackground>
  );
};

export default TransactionCreationPopup;