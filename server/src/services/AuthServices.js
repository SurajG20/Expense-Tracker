import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import model from "../models/index.js";

class AuthServices {
  static async findUser(condition) {
    return await model.UserModel.findOne(condition);
  }

  static async createToken(request) {
    const { userID } = request;
    const t_id = crypto.randomBytes(40).toString("hex");

    await model.TokenModel.destroy({ where: { userId: userID } });
    await model.TokenModel.create({
      jti: t_id,
      userId: userID,
      expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000),
    });

    const token = jwt.sign({ jti: t_id }, config.PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "12h",
    });

    return token;
  }

  static async createUser(data) {
    return await model.UserModel.create(data);
  }

  static async findToken(condition) {
    return await model.TokenModel.findOne(condition);
  }
}

export default AuthServices;
