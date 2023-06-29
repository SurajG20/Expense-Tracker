import { useState } from 'react';
import './App.css';
import Header from './component/header/Header';
import Balance from './component/balance/Balance';
import IncomeExpenses from './component/incomeExpenses/IncomeExpenses';
import TransacionsList from './component/transactions/TransacionsList';
import AddTransactions from './component/transactions/AddTransactions';
import { GlobalProvider } from './store/GlobalState';
GlobalProvider;
function App() {
  return (
    <GlobalProvider>
      <div className="main-container">
        <main>
          <Header />
          <div className="container">
            <Balance />
            <IncomeExpenses />
            <TransacionsList />
            <AddTransactions />
          </div>
        </main>
      </div>
    </GlobalProvider>
  );
}

export default App;
