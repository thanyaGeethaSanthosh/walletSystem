import React, { useState } from 'react';
import styled from 'styled-components';
import CommonButton from './CommonButton';
import COLORS from '../values/colors';

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 10px;
  left: 10;
  background-color: ${COLORS.light1};
  border-radius: 20px;
  padding: 10px 10px 10px;
  z-index: 1;
`;

const DropdownOption = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.light2};
  }
`;

const SortDropdown = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <DropdownContainer>
            <CommonButton id="sortButton" text="Sort by" onClickFunction={() => setIsOpen(!isOpen)} alignment="right" />
            {isOpen && (
                <DropdownMenu>
                    <DropdownOption onClick={() => handleOptionClick('ascDate')}>
                        Oldest Date First
                    </DropdownOption>
                    <DropdownOption onClick={() => handleOptionClick('descDate')}>
                        Newest Date First
                    </DropdownOption>
                    <DropdownOption onClick={() => handleOptionClick('ascAmount')}>
                        Lowest Amount First
                    </DropdownOption>
                    <DropdownOption onClick={() => handleOptionClick('descAmount')}>
                        Highest Amount First
                    </DropdownOption>
                </DropdownMenu>
            )}
        </DropdownContainer>
    );
};

export default SortDropdown;
