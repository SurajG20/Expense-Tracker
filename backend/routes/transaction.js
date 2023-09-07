const router = require("express").Router();
const { addIncome, deleteIncome, getIncome } = require("../controllers/income");
router
  .post("/add-income", addIncome)
  .delete("/delete-income/:id", deleteIncome)
  .get("/get-incomes", getIncome);

module.exports = router;
