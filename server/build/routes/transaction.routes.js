"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var income_controllers_1 = require("../controllers/income.controllers");
var expense_controllers_1 = require("../controllers/expense.controllers");
var verifyToken_1 = require("../middlewares/verifyToken");
var router = (0, express_1.Router)();
router
    .post('/add-income', verifyToken_1.verifyToken, income_controllers_1.addIncome)
    .delete('/delete-income/:id', verifyToken_1.verifyToken, income_controllers_1.deleteIncome)
    .get('/get-incomes', verifyToken_1.verifyToken, income_controllers_1.getIncome)
    .post('/add-expense', verifyToken_1.verifyToken, expense_controllers_1.addExpense)
    .delete('/delete-expense/:id', verifyToken_1.verifyToken, expense_controllers_1.deleteExpense)
    .get('/get-expenses', verifyToken_1.verifyToken, expense_controllers_1.getExpense);
exports.default = router;
//# sourceMappingURL=transaction.routes.js.map