import UserModel from "./User.js";
import TokenModel from "./Token.js";
import FinanceModel from "./Finance.js";

UserModel.sync();
TokenModel.sync({ alter: true });
FinanceModel.sync();

export default {
  UserModel,
  TokenModel,
  FinanceModel,
};
