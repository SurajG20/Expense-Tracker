"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var IncomeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        maxLength: 50,
        trim: true,
        required: true,
    },
    amount: {
        type: String,
        maxLength: 20,
        trim: true,
        required: true,
    },
    type: {
        type: String,
        default: 'income',
    },
    date: {
        type: Date,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    user: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Income', IncomeSchema);
//# sourceMappingURL=incomeModel.js.map