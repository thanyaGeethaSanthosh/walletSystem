import React, { useState } from 'react';
import styled from 'styled-components';
import COLORS from '../values/colors';
import CommonButton from './CommonButton';
import InputText from './InputText';

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


const PopUpWindow = (props) => {
  const { setIsPopUpVisible } = props
  const [amount, setAmount] = useState("");
  return (
    <BlurredBackground>
      <PopUpContent id="cookiesPopup">
        <CloseButton className="close" onClick={() => setIsPopUpVisible(false)}>✖</CloseButton>
        <InputText id="amount" name="AMOUNT" value={amount} setValue={setAmount} />
        <CommonButton id={"popup1"} onClick={() => { }} text={"add a transaction"} />
      </PopUpContent>
    </BlurredBackground>
  );
};

export default PopUpWindow;