import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TitleText from './TitleText';
import Spinner from './Spinner';
import PageSectionBar from './PageSectionBar';
import LinkButton from './LinkButton';
import COLORS from '../values/colors';
import { MAX_PAGE_SIZE } from '../values/constants';
import ExportButton from './ExportButton';

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
  margin-top: 8px;
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

const Transactions = (props) => {
  const { walletId, FetchAPI } = props
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [error, setError] = useState(null);
  const [transactionData, setTransactionData] = useState(null);

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

  return (
    <>
      <LinkButton text="Go to Wallet Details" path="/" />
      <Container>
        <TitleText title="Transactions" />
        <PageSectionBar setPageNo={setPageNo} pageNo={pageNo} />
        <ExportButton FetchAPI={FetchAPI} walletId={walletId} />
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
      </Container>
    </>
  );
}

Transactions.propTypes = {
  FetchAPI: PropTypes.object.isRequired,
  walletId: PropTypes.string.isRequired
};

export default Transactions;
