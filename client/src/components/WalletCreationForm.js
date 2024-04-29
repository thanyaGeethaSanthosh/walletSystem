
import React,{ useState } from 'react';
import styled from 'styled-components';
import COLORS from '../values/colors';
import TitleText from './TitleText';
import FetchAPI from '../handlers/FetchAPI';

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
  color: ${COLORS.light1};
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
  background: ${COLORS.light2};
  color: ${COLORS.light1};
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
color: ${COLORS.light2};
outline: none;
cursor: pointer;
border: solid 1px ${COLORS.light2};
&:hover {
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
background: ${COLORS.light1};
color: ${COLORS.light2};
`

function WalletCreationForm(props) {
  // const {fetchAPI}=props
  console.log(FetchAPI);
  const [formData, setFormData] = useState({
    username: "",
    walletName: "",
    balance:""
  });
  const handleChange = (event) => {
    setFormData(prev => ({ ...prev, [event.target.id]: event.target.value }));
    console.log("formData",formData);
  };

  // const handleSubmit = () => {
  //   // no "submit event" param needed above ^
  //   // sendInputValueToApi(value).then(() => /* Do something */)
  // };


  return (
    <StyledFormBody>
      <TitleText title="Wallet System"/>
      <StyledForm>
        <StyledInput id="username" onChange={handleChange} type="text" placeholder="USERNAME" />
        <StyledInput id="walletname" onChange={handleChange} type="text" placeholder="WALLET NAME" />
        <StyledInput id="balance" onChange={handleChange} type="text" placeholder="INITIAL BALANCE" />
        <SubmitButton id="submit" type="submit" value="GO!" />
      </StyledForm>
    </StyledFormBody>
  )
}

export default WalletCreationForm;
