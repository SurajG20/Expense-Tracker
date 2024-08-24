"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        maxLength: 20,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });
exports.userModel = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=userModel.js.map