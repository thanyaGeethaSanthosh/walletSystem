
import React from 'react';
import styled from 'styled-components';
import COLORS from '../values/colors';

const StyledButton = styled.button`
    background-color: ${COLORS.light2};
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    width: 200px;
    padding: 14px;
    font-size: 16px;
    color: ${COLORS.dark2};
    &:active{
        background-color: ${COLORS.dark2};
        box-shadow: 0px 6px 18px -5px ${COLORS.dark2_lighter};
    }
    &:hover{
         background-color:${COLORS.dark2_lighter};
         color: ${COLORS.light1};
    }
`;

const CenteredContainer = styled.div`
    display: flex;
    justify-content: ${props => props.alignment};
    height: 100%;
`;


function CommonButton(props) {
    const { id, text, onClickFunction, alignment = "center" } = props
    return (
        <CenteredContainer alignment={alignment}>
            <StyledButton id={id} onClick={onClickFunction}>{text}</StyledButton>
        </CenteredContainer>
    )
}

export default CommonButton;
