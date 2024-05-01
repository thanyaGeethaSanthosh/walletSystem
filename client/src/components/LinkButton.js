import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../values/colors';

const StyledLinkButton = styled.a`
  font-family: 'Lato', sans-serif;
  margin-right: 45px;
  font-size: 1em;
  outline: none;
  border-bottom: none;
  font-size: 0.875em;
  color: ${COLORS.dark2};
  outline: none;
  cursor: pointer;
  text-align: center;
  margin-left: auto; 
  text-decoration: none;
`;

const HeaderBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: ${COLORS.light1};
  color: ${COLORS.dark1};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

function LinkButton(props) {
  const { text, path } = props
  const navigate = useNavigate();
  const changePath = () => {
    navigate(path)
  };
  return (
    <HeaderBar>
      <StyledLinkButton href="#" onClick={changePath}>{text}</StyledLinkButton>
    </HeaderBar>
  )
}

export default LinkButton;
