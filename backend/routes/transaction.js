const router = require("express").Router();
const { addIncome, deleteIncome, getIncome } = require("../controllers/income");
const {
  addExpense,
  deleteExpense,
  getExpense,
} = require("../controllers/expense");
router
  .post("/add-income", addIncome)
  .delete("/delete-income/:id", deleteIncome)
  .get("/get-incomes", getIncome)
  .post("/add-expense", addExpense)
  .delete("/delete-expense/:id", deleteExpense)
  .get("/get-expenses", getExpense);

module.exports = router;
