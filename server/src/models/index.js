import UserModel from "./User.js";
import TokenModel from "./Token.js";
import FinanceModel from "./Finance.js";

UserModel.sync({ alter: true });
TokenModel.sync();
FinanceModel.sync();

export default {
  UserModel,
  TokenModel,
  FinanceModel,
};
