"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ExpenseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        maxLength: 50,
        trim: true,
        required: true
    },
    amount: {
        type: String,
        maxLength: 20,
        trim: true,
        required: true
    },
    type: {
        type: String,
        default: 'expense'
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    user: {
        type: String
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Expense', ExpenseSchema);
//# sourceMappingURL=expenseModel.js.map