export const calculateTotalIncome = (incomes) => {
  return incomes.reduce((total, income) => total + income.amount, 0);
};

export const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const calculateTotalBalance = (incomes, expenses) => {
  const totalIncome = calculateTotalIncome(incomes);
  const totalExpenses = calculateTotalExpenses(expenses);
  return totalIncome - totalExpenses;
};

export const getTransactionHistory = (incomes, expenses) => {
  const history = [...incomes, ...expenses];
  history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return history.slice(0, 3);
};
