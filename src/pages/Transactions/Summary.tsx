import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import CardDataStats from '../../components/CardDataStats';
import CategoriesChart from '../../components/Charts/CategoriesChart.tsx';
import TableCategories from '../../components/Tables/TableCategories.tsx';
import DefaultLayout from '../../layout/DefaultLayout';
import { useGetTransactionsQuery, useGetTransactionsSummaryQuery } from '../../services/transactions.ts';
import { USD, usePopulateTestData } from '../../utils.ts';

const Summary: React.FC = () => {
  const { data, error, isLoading } = useGetTransactionsQuery();
  const { data: summaryData } = useGetTransactionsSummaryQuery();
  const { populateTestData, loading } = usePopulateTestData();

  const transactionsData = useMemo(
    () => ({
      totalTransactions: data?.length || 0,
      totalTransactionsAmount: data?.reduce((acc: number, transaction: any) => {
        console.log(transaction, acc);
        return transaction.amount + acc;
      }, 0),
      totalCategories: summaryData?.length || 0,
    }),
    [data, summaryData],
  );

  return (
    <DefaultLayout>
      {!isLoading && summaryData ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <div className="flex justify-center space-x-2 items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <NavLink
                to="/transactions/create"
                className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
              >
                Add Transaction
              </NavLink>
              <button
                className="text-white bg-orange-600 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
                onClick={() => populateTestData()}
              >
                {loading ? 'Working...' : 'Populate Test Date'}
              </button>
            </div>
            <CardDataStats title="Total Transactions" total={transactionsData.totalTransactions} />
            <CardDataStats title="Total Amount" total={USD(transactionsData.totalTransactionsAmount ?? 0)} />
            <CardDataStats title="Categories" total={transactionsData.totalCategories} />
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <div>
              <TableCategories summaryData={summaryData} />
            </div>

            <div>
              <CategoriesChart summaryData={summaryData} />
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {error && <h1>API Error</h1>}
    </DefaultLayout>
  );
};

export default Summary;
