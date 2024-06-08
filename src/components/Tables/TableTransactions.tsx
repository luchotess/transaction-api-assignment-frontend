import { NavLink } from 'react-router-dom';
import { useDeleteTransactionByIDMutation } from '../../services/transactions.ts';
import { Transaction } from '../../types/transaction.ts';
import { USD } from '../../utils.ts';

type TableTransactionsProps = {
  transactions: Transaction[];
  isTransactionsLoading: boolean;
};

const TableTransactions = ({ transactions, isTransactionsLoading }: TableTransactionsProps) => {
  const [deleteTransaction, { isLoading }] = useDeleteTransactionByIDMutation();

  const onDelete = (id: number) => {
    deleteTransaction(id);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between mb-4">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Transactions</h4>

        <NavLink
          to="/transactions/create"
          className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Add Transaction
        </NavLink>
      </div>

      <div className={`flex flex-col ${(isLoading || isTransactionsLoading) && 'opacity-50'}`}>
        <div className="grid grid-cols-6 rounded-sm bg-gray-2">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Description</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Category</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Amount</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Date</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Type</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base"></h5>
          </div>
        </div>

        {transactions.map((transaction: Transaction, key: number) => (
          <div className={`grid grid-cols-6 ${key === transactions.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'}`} key={key}>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white font-bold">{transaction.description}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{transaction.category}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{USD(transaction.amount)}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{transaction.date}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{transaction.type}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <NavLink
                to={`/transactions/edit/${transaction.id}`}
                className="text-white bg-slate-700 hover:bg-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-salte-600 dark:hover:bg-slate-700"
              >
                Edit
              </NavLink>
              <button
                className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
                onClick={() => onDelete(transaction.id)}
                disabled={isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {transactions.length === 0 && <p className="p-4">There are no transactions. Add one to show details.</p>}
      </div>
    </div>
  );
};

export default TableTransactions;
