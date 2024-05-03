import React from 'react';
import styled from 'styled-components';
import COLORS from '../values/colors';

const ToggleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Label = styled.div`
    margin-right: 0.5rem;
    margin-left:0.5rem;
`;

const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
`;

const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    margin-top: 0.5rem;
    width: 50px;
    height: 26px;
    background-color: ${COLORS.light2};
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.25s ease-in;

    &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 22px;
        height: 22px;
        background-color: ${COLORS.light1};
        border-radius: 50%;
        transition: all 0.25s ease-out;
    }

    ${ToggleInput}:checked + & {
        background-color: ${COLORS.dark2};
    }

    ${ToggleInput}:checked + &::after {
        transform: translateX(24px);
    }
`;

const ToggleButton = ({ label1, label2, isChecked, onChange }) => {
    return (
        <ToggleContainer>
            <Label>{label1}</Label>
            <ToggleInput id="cb-toggle" checked={isChecked} onChange={onChange} />
            <ToggleSwitch htmlFor="cb-toggle" className="toggle" />
            <Label>{label2}</Label>
        </ToggleContainer>
    );
};

export default ToggleButton;
