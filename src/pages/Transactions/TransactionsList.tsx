import React from 'react';
import TableTransactions from '../../components/Tables/TableTransactions.tsx';
import DefaultLayout from '../../layout/DefaultLayout';
import { useGetTransactionsQuery } from '../../services/transactions.ts';

const TransactionsList: React.FC = () => {
  const { data, error, isLoading } = useGetTransactionsQuery();

  return (
    <DefaultLayout>
      {!isLoading ? (
        <>
          <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <TableTransactions transactions={data ?? []} isTransactionsLoading={isLoading} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {error && <h1>API Error</h1>}
    </DefaultLayout>
  );
};

export default TransactionsList;
