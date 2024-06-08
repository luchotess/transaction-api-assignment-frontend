import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DateSelector from '../../components/Forms/DateSelector.tsx';
import TypeSelector from '../../components/Forms/TypeSelector.tsx';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  useCreateTransactionMutation,
  useDeleteTransactionByIDMutation,
  useGetTransactionByIdQuery,
  useUpdateTransactionByIdMutation,
} from '../../services/transactions.ts';
import { TransactionFormData, defaultTransactionFormValues, transactionSchema } from '../../types/transactionForm.ts';

const CreateEditTransaction = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: transactionData, isLoading: isTransactionLoading } = useGetTransactionByIdQuery(params.id!, { skip: !params.id });

  const [createTransaction, { isLoading: isCreateLoading, isSuccess: isCreateSuccess }] = useCreateTransactionMutation();
  const [updateTransaction, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] = useUpdateTransactionByIdMutation();
  const [deleteTransaction, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] = useDeleteTransactionByIDMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: defaultTransactionFormValues,
  });

  const onSubmit = (data: TransactionFormData) => {
    if (!transactionData?.id) {
      createTransaction(data);
    } else {
      updateTransaction({ ...data, id: transactionData.id });
    }
  };

  const onDelete = () => {
    if (transactionData?.id) {
      deleteTransaction(transactionData.id);
    }
  };

  useEffect(() => {
    if (transactionData) {
      reset(transactionData);
    }
  }, [transactionData]);

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess || isDeleteSuccess) {
      navigate('/transactions/list');
    }
  }, [isCreateSuccess, isUpdateSuccess, isDeleteSuccess]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={transactionData?.id ? 'Edit Transaction' : 'Create Transaction'} />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Transaction Details</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`p-6.5 grid grid-cols-2 gap-4 ${
                (isCreateLoading || isTransactionLoading || isUpdateLoading || isDeleteLoading) && 'opacity-50'
              }`}
            >
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">Description</label>
                <input
                  type="text"
                  disabled={isCreateLoading}
                  placeholder="Enter the transaction description"
                  {...register('description')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.description && <span className="text-red-700">{errors.description.message}</span>}
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">Category</label>
                <input
                  type="text"
                  disabled={isCreateLoading}
                  placeholder="Enter the transaction category"
                  {...register('category')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.category && <span className="text-red-700">{errors.category.message}</span>}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Date <span className="text-meta-1">*</span>
                </label>

                <DateSelector register={register} name="date" disabled={isCreateLoading} />
                {errors.date && <span className="text-red-700">{errors.date.message}</span>}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Type</label>
                <TypeSelector register={register} name="type" disabled={isCreateLoading} />

                {errors.type && <span className="text-red-700">{errors.type.message}</span>}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  disabled={isCreateLoading}
                  {...register('amount', { setValueAs: (value) => parseFloat(value) })}
                  placeholder="Enter the transaction amount"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.amount && <span className="text-red-700">{errors.amount.message}</span>}
              </div>

              <div className="col-span-2 flex space-x-2">
                <button className="flex-1 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" type="submit">
                  {isCreateLoading || isUpdateLoading ? 'Saving...' : 'Save Transaction'}
                </button>
                {transactionData?.id && (
                  <div className="flex space-x-2">
                    <button
                      className="flex-1 justify-center rounded bg-red-700 p-3 font-medium text-gray hover:bg-opacity-90"
                      disabled={isDeleteLoading}
                      onClick={onDelete}
                    >
                      {isDeleteLoading ? 'Deleting...' : 'Delete'}
                    </button>
                    <NavLink
                      to="/transactions/list"
                      className="flex-1 justify-center rounded bg-slate-600 p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                      Cancel
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateEditTransaction;
