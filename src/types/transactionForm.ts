import { z } from 'zod';

export const transactionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD'),
  amount: z.number(),
  type: z.enum(['Income', 'Expense']),
  category: z.string().min(1, 'Category is required'),
  id: z.number().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

export const defaultTransactionFormValues: TransactionFormData = {
  description: '',
  date: '',
  amount: 0,
  type: 'Income',
  category: '',
};
