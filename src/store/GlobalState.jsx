import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
const intialState = {
  transactions: [
    { id: 1, name: 'Buy a book', amount: 20 },
    { id: 2, name: 'Buy a milk', amount: 5 },
    { id: 3, name: 'Book a flight ticket', amount: 225 },
    { id: 4, name: 'Buy a car', amount: 20000 },
  ],
};

export const GlobalContext = createContext(intialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, intialState);
  return (
    <GlobalContext.Provider value={intialState}>
      {children}
    </GlobalContext.Provider>
  );
};
