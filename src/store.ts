import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { transactionsApi } from './services/transactions';

export const store = configureStore({
  reducer: {
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(transactionsApi.middleware),
});

setupListeners(store.dispatch);
