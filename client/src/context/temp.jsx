import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/';

const GlobalContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState({});

  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data.incomes);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes &&
      incomes.forEach((income) => {
        totalIncome = totalIncome + income.amount;
      });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data.expenses);
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses &&
      expenses.forEach((income) => {
        totalIncome = totalIncome + income.amount;
      });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  // User Authentication

  const register = async (data) => {
    const response = await axios
      .post(`${BASE_URL}register`, data)
      .catch((err) => {
        setError(err.response.data.message);
      });
    console.log('response register :', response);
  };
  const login = async (data) => {
    const response = await axios.post(`${BASE_URL}login`, data).catch((err) => {
      setError(err.response.data.message);
    });
    setUser(true);
    setUserData(response.data);
    const serializedObj = JSON.stringify(response.data.token);
    localStorage.setItem('token', serializedObj);
  };
  const logout = async () => {
    const response = await axios
      .post(`${BASE_URL}logout`)
      .catch((err) => setError(err.response.data.message));
    setUser(false);
    localStorage.clear('token');
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        register,
        login,
        user,
        setUser,
        logout,
        userData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
