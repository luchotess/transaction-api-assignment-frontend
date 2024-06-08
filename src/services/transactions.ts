import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import appConfig from '../app.config.ts';
import { NewTransaction, Transaction, TransactionCategorySummary } from '../types/transaction.ts';

export const transactionsApi = createApi({
  reducerPath: 'transactionsAPI',
  tagTypes: ['Transactions'],
  baseQuery: fetchBaseQuery({ baseUrl: appConfig.baseAPIUrl }),
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => 'transactions',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Transactions', id }) as const), { type: 'Transactions', id: 'List' }]
          : [{ type: 'Transactions', id: 'List' }],
    }),
    getTransactionById: builder.query<Transaction, string>({
      query: (id: string) => `transactions/${id}`,
    }),
    getTransactionsSummary: builder.query<TransactionCategorySummary[], void>({
      query: () => 'transactions/summary',
      providesTags: (result) =>
        result
          ? [...result.map(({ category }) => ({ type: 'Transactions', category }) as const), { type: 'Transactions', id: 'Summary' }]
          : [{ type: 'Transactions', id: 'Summary' }],
    }),
    deleteTransactionByID: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Transactions', id: 'List' },
        { type: 'Transactions', id: 'Summary' },
      ],
    }),
    createTransaction: builder.mutation<void, NewTransaction>({
      query: (body) => ({
        url: 'transactions',
        body,
        method: 'POST',
      }),
      invalidatesTags: [
        { type: 'Transactions', id: 'List' },
        { type: 'Transactions', id: 'Summary' },
      ],
    }),
    updateTransactionById: builder.mutation<void, Transaction>({
      query: (body) => ({
        url: `transactions/${body.id}`,
        body,
        method: 'PUT',
      }),
      invalidatesTags: [
        { type: 'Transactions', id: 'List' },
        { type: 'Transactions', id: 'Summary' },
      ],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionsSummaryQuery,
  useDeleteTransactionByIDMutation,
  useCreateTransactionMutation,
  useGetTransactionByIdQuery,
  useUpdateTransactionByIdMutation,
} = transactionsApi;
