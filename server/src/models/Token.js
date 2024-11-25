import { Model, Sequelize } from "../database/connect.js";

const TokenModel = Model.define(
  "access_tokens",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: Sequelize.STRING,
    expires_at: Sequelize.DATE,
    client_id: Sequelize.STRING,
    email: Sequelize.STRING,
    username: Sequelize.STRING,
  },
  {
    timestamps: true,
  }
);

export default TokenModel;
