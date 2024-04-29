
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import COLORS from '../values/colors';

const StyledHeader = styled.header`
position: relative;
margin: 100px 0 25px 0;
font-size: 2.3em;
color: ${COLORS.dark2};
text-align: center;
letter-spacing: 7px;
`

function TitleText({title}) {
    return (
        <StyledHeader>{title}</StyledHeader>

    )
}

TitleText.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleText;
