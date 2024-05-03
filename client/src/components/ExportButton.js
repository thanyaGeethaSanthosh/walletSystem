import React from 'react';
import CommonButton from './CommonButton';

const prepareCSV = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        return '';
    }
    const headers = Object.keys(data[0]);
    const headerRow = headers.join(',') + '\n';

    const dataRows = data.map((item) => {
        return headers.map((key) => {
            let value = item[key];
            if (typeof value === 'string') {
                value = `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).join(',');
    }).join('\n');

    const csvData = headerRow + dataRows;
    return csvData;
};


const ExportButton = (props) => {
    const { FetchAPI, walletId } = props
    const handleExportCSV = async () => {
        try {
            const response = await FetchAPI.getAllTransactions(walletId)
            const csvData = prepareCSV(response);

            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'transactions.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting data to CSV:', error);
        }
    };


    return (
        <CommonButton id="exportCsv" text="Export to CSV" onClickFunction={handleExportCSV} alignment="left" />
    );
};

export default ExportButton;
