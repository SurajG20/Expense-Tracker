import { Model, Sequelize } from "../database/connect.js";

const TokenModel = Model.define(
  "access_tokens",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: Sequelize.STRING,
    expires_at: Sequelize.DATE,
    clientId: Sequelize.STRING,
    email: Sequelize.STRING,
    username: Sequelize.STRING,
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ["userID"],
      },
      {
        fields: ["email"],
      },
    ],
  }
);

export default TokenModel;
