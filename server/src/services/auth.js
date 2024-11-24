import crypto from "crypto";
import model from "../models/model.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

async function findUserByEmail(email) {
  const user = await model.AuthModel.findOne({
    where: { email },
  });
  return user;
}

async function createToken(id, email) {
  const t_id = crypto.randomBytes(40).toString("hex");

  await model.TokenModel.destroy({ where: { user_id: id } });
  await model.TokenModel.create({
    id: t_id,
    user_id: id,
    client_id: "1",
    email: email,
  });
  const token = jwt.sign({ jti: t_id }, config.PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: "12h",
  });

  return token;
}

export default {
  findUserByEmail,
  createToken,
};
