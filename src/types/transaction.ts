export type NewTransaction = {
  amount: number;
  description: string;
  date: string;
  type: 'Income' | 'Expense';
  category: string;
};

export interface Transaction extends NewTransaction {
  id: number;
}

export type TransactionCategorySummary = {
  total_amount: number;
  total_transactions: number;
  category: string;
};
