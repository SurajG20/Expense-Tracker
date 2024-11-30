import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import model from "../models/index.js";

async function findUser(condition) {
  return await model.UserModel.findOne(condition);
}

async function createUser(data) {
  return await model.UserModel.create(data);
}

async function createToken({ id, email, username }) {
  const t_id = crypto.randomBytes(40).toString("hex");

  await model.TokenModel.destroy({ where: { userId: id } });
  await model.TokenModel.create({
    id: t_id,
    userId: id,
    clientId: "1",
    email: email,
    username: username,
  });

  const token = jwt.sign({ jti: t_id }, config.PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: "12h",
  });

  return token;
}

export default {
  findUser,
  createToken,
  createUser,
};
