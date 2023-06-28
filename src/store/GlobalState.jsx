import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
const intialState = {
  transactions: [
    { id: 1, name: 'Buy a book', amount: 20 },
    { id: 2, name: 'Buy a milk', amount: 5 },
    { id: 3, name: 'Book a flight ticket', amount: 225 },
    { id: 4, name: 'Buy a car', amount: -20 },
  ],
};

export const GlobalContext = createContext(intialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, intialState);
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
