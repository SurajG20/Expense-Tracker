import { Model, Sequelize } from "../database/connect.js";

const TokenModel = Model.define(
  "access_tokens",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.UUID,
    },
    jti: Sequelize.STRING,
    expires_at: { type: Sequelize.DATE },
  },
  {
    timestamps: true,
  }
);

export default TokenModel;
