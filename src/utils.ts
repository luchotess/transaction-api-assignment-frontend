import currency from 'currency.js';
import { useState } from 'react';
import { useCreateTransactionMutation } from './services/transactions.ts';
import { NewTransaction, Transaction } from './types/transaction.ts';

export function USD(value: number | string): string {
  return `${currency(value, { symbol: '$', precision: 2 }).format()}`;
}

export const usePopulateTestData = () => {
  const [results, setResults] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createTransaction] = useCreateTransactionMutation();

  const transactionsToCreate: NewTransaction[] = [
    { description: 'Transaction 0', date: '2023-06-01', amount: 240.5, type: 'Income', category: 'Salary' },
    { description: 'Transaction 1', date: '2023-05-01', amount: 100, type: 'Income', category: 'Salary' },
    { description: 'Transaction 2', date: '2023-06-02', amount: 50.4, type: 'Expense', category: 'Groceries' },
    { description: 'Transaction 3', date: '2023-06-03', amount: 150, type: 'Expense', category: 'Groceries' },
    { description: 'Transaction 4', date: '2023-06-04', amount: 75, type: 'Expense', category: 'Entertainment' },
  ];

  const populateTestData = async () => {
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(transactionsToCreate.map((transaction) => createTransaction(transaction).unwrap()));

      setResults(responses);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  // Retornar la función de mutación y los estados
  return {
    populateTestData,
    results,
    loading,
    error,
  };
};
