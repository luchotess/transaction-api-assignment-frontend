import { TransactionCategorySummary } from '../../types/transaction.ts';
import { USD } from '../../utils.ts';

const TableCategories = ({ summaryData }: any) => {
  return (
    summaryData && (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Categories Summary</h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Amount</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Transactions</h5>
            </div>
          </div>

          {summaryData.map((category: TransactionCategorySummary, key: number) => (
            <div className={`grid grid-cols-4 ${key === summaryData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'}`} key={key}>
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="text-black dark:text-white font-bold">{category.category}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{USD(category.total_amount)}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{category.total_transactions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default TableCategories;
