import { Sequelize } from "sequelize";
import config from "../config/config.js";

const Model = new Sequelize(
  config.SQL_DATABASE,
  config.SQL_USERNAME,
  config.SQL_PASSWORD,
  {
    host: config.SQL_HOST,
    port: config.SQL_PORT,
    dialect: "mysql",
    logging: config.IS_LIVE === 0 ? (...msg) => console.log(msg) : false,
  }
);

export { Sequelize, Model };
