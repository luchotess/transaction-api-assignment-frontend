import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import CreateEditTransaction from './pages/Transactions/CreateEditTransaction.tsx';
import Summary from './pages/Transactions/Summary.tsx';
import TransactionsList from './pages/Transactions/TransactionsList.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Transactions Summary" />
              <Summary />
            </>
          }
        />

        <Route
          path="/transactions/list"
          element={
            <>
              <PageTitle title="Transactions List" />
              <TransactionsList />
            </>
          }
        />

        <Route
          path="/transactions/create"
          element={
            <>
              <PageTitle title="Add Transaction" />
              <CreateEditTransaction />
            </>
          }
        />

        <Route
          path="/transactions/edit/:id"
          element={
            <>
              <PageTitle title="Edit Transaction" />
              <CreateEditTransaction />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
