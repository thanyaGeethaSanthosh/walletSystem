import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  border-radius: 50%;
  border: 8px solid #3498db;
  border-bottom-color: #ffffff;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  background: transparent;
  animation: ${spin} 2s linear infinite;
`;

const Spinner = () => <StyledSpinner />;

export default Spinner;
