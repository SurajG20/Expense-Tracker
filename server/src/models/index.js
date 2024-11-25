import UserModel from "./User.js";
import TokenModel from "./Token.js";

UserModel.sync();
TokenModel.sync();

export default {
  UserModel,
  TokenModel,
};
