import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../values/colors';

const Pagination = styled.ul`
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
`;

const PaginationItem = styled.li`
  display: inline-block;
`;

const PaginationLink = styled.a`
  position: relative;
  padding: 20px 25px;
  text-decoration: none;
  color:${COLORS.dark1};
  background:${COLORS.light1};
  font-weight: 500;
  cursor: pointer;

  &:hover,
  &.active {
    color: ${COLORS.dark2};
    background: ${COLORS.light2};
  }
`;

function PageSectionBar(props) {
    const { setPageNo, pageNo } = props
    const MAX_PAGES_BUTTON_TO_SHOW = 5;
    const [startPagesToShow, setStartPagesToShow] = useState(1);

    useEffect(() => {
        if (startPagesToShow + MAX_PAGES_BUTTON_TO_SHOW <= pageNo) {
            setStartPagesToShow(startPagesToShow + 1)
        }
        if (startPagesToShow > pageNo) {
            setStartPagesToShow(startPagesToShow - 1)
        }
    }, [pageNo, startPagesToShow]);


    const handleClick = (event) => {
        setPageNo(prev => {
            const value = event.target.textContent
            if (value?.toLowerCase() === "previous" && prev > 1) {
                return pageNo - 1
            } else if (value?.toLowerCase() === "next") {
                return pageNo + 1
            } else if (!isNaN(parseInt(value))) {
                return parseInt(value)
            }
            return prev;
        });

    };

    const PageButtons = []

    for (let iterator = startPagesToShow; iterator < MAX_PAGES_BUTTON_TO_SHOW + startPagesToShow; iterator++) {
        PageButtons.push(
            <PaginationItem>
                <PaginationLink href="#" style={iterator === pageNo ? { backgroundColor: COLORS.dark2, color: COLORS.light1 } : {}} onClick={handleClick}>{iterator}</PaginationLink>
            </PaginationItem>
        );
    }

    return (
        <Pagination>
            <PaginationItem>
                <PaginationLink href="#" onClick={handleClick}>Previous</PaginationLink>
            </PaginationItem>
            {
                PageButtons
            }
            <PaginationItem>
                <PaginationLink href="#" onClick={handleClick}>Next</PaginationLink>
            </PaginationItem>
        </Pagination>
    );
}

export default PageSectionBar;
