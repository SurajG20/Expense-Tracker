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
  // const [expenses, setExpenses] = useState(ALL_EXPENSES);

  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransacionsList />
        <AddTransactions />
      </div>
    </GlobalProvider>
  );
}

export default App;
