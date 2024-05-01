
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TitleText from './TitleText';
import Spinner from './Spinner';
import TransactionCreationPopup from './TransactionCreationPopup';
import LinkButton from './LinkButton';
import CommonButton from './CommonButton';

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
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [walletDetails, setWalletDetails] = useState("");

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
    }, [FetchAPI, walletId, isPopUpVisible]);

    if (loading) {
        return <Spinner />;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            <LinkButton text="Go to Transactions" path="/transactions" />
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
                <CommonButton id={"createtransaction"} onClickFunction={() => setIsPopUpVisible(true)} text={"Add a Transaction"} />
            </Container>
            {isPopUpVisible ? (<TransactionCreationPopup FetchAPI={FetchAPI} setLoading={setLoading} setError={setError} walletId={walletId} setIsPopUpVisible={setIsPopUpVisible} />) : ""}
        </>
    )
}

export default WalletDetails;
