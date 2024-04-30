import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TitleText from './TitleText';
import Spinner from './Spinner';
import PageSectionBar from './PageSectionBar';
import COLORS from '../values/colors';
import { MAX_PAGE_SIZE } from '../values/constants';

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

const Th = styled.th`
  padding: 15px;
  background-color: ${COLORS.light2};
  color: #fff;
  text-align: left;
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

const Transactions = (props) => {
  const { walletId, FetchAPI } = props
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [error, setError] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchAPI.getTransactions(walletId, (pageNo - 1) * MAX_PAGE_SIZE, MAX_PAGE_SIZE)
        setTransactionData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [FetchAPI, walletId, pageNo]);


  if (loading) {
    return <Spinner />;
  }
  else if (error) {
    return <div>Error: {error.message}</div>;
  }

  const goToWalletDetails = () => {
    navigate('/')
  };

  return (
    <Container>
      <TitleText title="Transactions" />
      <PageSectionBar setPageNo={setPageNo} pageNo={pageNo} />
      <Table>
        <thead>
          <tr>
            <Th>id</Th>
            <Th>description</Th>
            <Th>walletId</Th>
            <Th>amount</Th>
            <Th>balance</Th>
            <Th>type</Th>
            <Th>date</Th>
          </tr>
        </thead>
        <tbody>
          {transactionData.map(transactionRow => {
            const {
              id,
              description,
              walletId,
              amount,
              balance,
              type,
              date,
            } = transactionRow
            return (
              <TbodyTr key={id}>
                <Td>{id}</Td>
                <Td>{description}</Td>
                <Td>{walletId}</Td>
                <Td>{amount}</Td>
                <Td>{balance}</Td>
                <Td>{type}</Td>
                <Td>{date}</Td>
              </TbodyTr>
            )
          })}
        </tbody>
      </Table>
      <LinkButton value="Go to Wallet Details" onClick={goToWalletDetails} />
    </Container>
  );
}

Transactions.propTypes = {
  FetchAPI: PropTypes.object.isRequired,
  walletId: PropTypes.string.isRequired
};

export default Transactions;
