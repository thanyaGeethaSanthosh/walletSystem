
import React from 'react';
import styled from 'styled-components';
import COLORS from '../values/colors';

const StyledInput = styled.input`
font-family: 'Lato', sans-serif;
font-size: 1em;
min-width: 100px; 
max-width: 470px; 
width: 80%;
height: 50px;
padding: 0px 15px 0px 15px;
background: transparent;
outline: none;
border: solid 1px ${COLORS.light2};
transition: all 0.3s ease-in-out;
-webkit-transition: all 0.3s ease-in-out;
-moz-transition: all 0.3s ease-in-out;
-ms-transition: all 0.3s ease-in-out;
&:hover {
  background: ${COLORS.light1};
  color: ${COLORS.dark2};
}
`

function InputText(props) {
    const { value, setValue, name, id } = props

    const handleChange = (event) => {
        setValue(prev => (event.target?.value));
    };

    return (
        <StyledInput id={id} onChange={handleChange} type="text" placeholder={name} />
    )
}

export default InputText;
