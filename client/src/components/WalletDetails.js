
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../values/colors';
import TitleText from './TitleText';
import Spinner from './Spinner';

const LinkButton = styled.input`
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
width: 502px;
padding: 0;
margin: -5px 0px 0px 0px;
font-family: 'Lato', sans-serif;
font-size: 0.875em;
color: ${COLORS.dark2};
outline: none;
cursor: pointer;
border: solid 1px ${COLORS.light2};
text-align: center;
&:hover {
  background: ${COLORS.dark2};
  color: ${COLORS.light1};
}
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Table = styled.table`
  width: 800px;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
`;


const Td = styled.td`
  padding: 15px;
  background-color: rgba(255,255,255,0.2);
  color: #000;
  position: relative;

  &:hover {
    &:before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: -9999px;
      bottom: -9999px;
      background-color: rgba(255,255,255,0.2);
      z-index: -1;
    }
  }
`;

const TbodyTr = styled.tr`
  &:hover {
    background-color: rgba(255,255,255,0.3);
  }
`;

function WalletDetails(props) {
    const { FetchAPI, walletId } = props
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [walletDetails, setWalletDetails] = useState("");
    const navigate = useNavigate();

    const goToTransactions = () => {
        navigate('/transactions')
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchAPI.getWallet(walletId)
                setWalletDetails(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <Spinner />;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <Container>
            <TitleText title="WalletDetails" />
            <Table>
                <tbody>
                    <TbodyTr>
                        <Td>wallet ID</Td>
                        <Td>{walletDetails.id}</Td>
                    </TbodyTr>
                    <TbodyTr>
                        <Td>wallet Name</Td>
                        <Td>{walletDetails.name}</Td>
                    </TbodyTr>
                    <TbodyTr>
                        <Td>wallet Balance</Td>
                        <Td>{walletDetails.balance}</Td>
                    </TbodyTr>
                    <TbodyTr>
                        <Td>Date</Td>
                        <Td>{walletDetails.date}</Td>
                    </TbodyTr>
                </tbody>
            </Table>
             <LinkButton value="Go to Transactions" onClick={goToTransactions} />
        </Container>
    )
}

export default WalletDetails;
