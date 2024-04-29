
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../values/colors';
import TitleText from './TitleText';
import Spinner from './Spinner';

const textBoxStyle = `
&::-webkit-input-placeholder,
&::-moz-placeholder,
&::placeholder,
&::-ms-input-placeholder {
  color: #aca49c;
  font-size: 1em;
}
&:focus::-webkit-input-placeholder,
&:focus::-moz-placeholder,
&:focus::placeholder,
&:focus::-ms-input-placeholder {
  color: #bbb5af;
}
&:hover::-webkit-input-placeholder,
&:hover::-moz-placeholder,
&:hover::placeholder,
&:hover::-ms-input-placeholder {
  color: ${COLORS.dark2};
}
&:hover:focus::-webkit-input-placeholder,
&:hover:focus::-moz-placeholder,
&:hover:focus::placeholder,
&:hover:focus::-ms-input-placeholder {
  color: #cbc6c1;
}
`;

const inputStyle = `
font-family: 'Lato', sans-serif;
font-size: 1em;
width: 470px;
height: 50px;
padding: 0px 15px 0px 15px;

background: transparent;
outline: none;
color: #726659;

border: solid 1px ${COLORS.light2};
border-bottom: none;

transition: all 0.3s ease-in-out;
-webkit-transition: all 0.3s ease-in-out;
-moz-transition: all 0.3s ease-in-out;
-ms-transition: all 0.3s ease-in-out;
&:hover {
  background: ${COLORS.light1};
  color: ${COLORS.dark2};
}
`
const StyledInput = styled.input`
${textBoxStyle}
${inputStyle}
`;

const SubmitButton = styled.input`
${textBoxStyle}
${inputStyle}
width: 502px;
padding: 0;
margin: -5px 0px 0px 0px;
font-family: 'Lato', sans-serif;
font-size: 0.875em;
color: ${COLORS.dark2};
outline: none;
cursor: pointer;
border: solid 1px ${COLORS.light2};
&:hover {
  background: ${COLORS.dark2};
  color: ${COLORS.light1};
}
`;

const StyledForm = styled.form`
position: relative;
width: 500px;
margin: 50px auto 100px auto;
`

const StyledFormBody = styled.div`
font-family: 'Lato', sans-serif;
color: ${COLORS.dark2};
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
  const [response, setResponse] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    walletName: "",
    balance: 0
  });
  const navigate = useNavigate();

  const goToTransactions = () => {
    navigate('/transactions')
  };

  const handleChange = (event) => {
    setFormData(prev => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const createWallet = () => {
    if (!formData.username || !formData.walletName) {
      setErrorMessage("userName and walletName are required to create a wallet")
      setTimeout(() => {
        setErrorMessage("")
      }, 5000);
      return;
    }
    setLoading(true)
    const fetchData = async () => {
      try {
        const result = await FetchAPI.CreateWallet(formData)
        setResponse(result);
      } catch (error) {
        setError(error);
      } finally {
        localStorage.setItem('walletId', response.id)
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
  return (
    <StyledFormBody>
      <TitleText title="Wallet System" />
      <StyledForm>
        <StyledInput id="username" onChange={handleChange} type="text" placeholder="USERNAME" />
        <StyledInput id="walletName" onChange={handleChange} type="text" placeholder="WALLET NAME" />
        <StyledInput id="balance" onChange={handleChange} type="text" placeholder="INITIAL BALANCE" />
        <SubmitButton id="submit" type="button" value="Create Wallet" onClick={createWallet} />
        <SubmitButton id="transactionlink" type="button" value="Go to Transactions" onClick={goToTransactions} />
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </StyledForm>
    </StyledFormBody>
  )
}

export default WalletCreationForm;
