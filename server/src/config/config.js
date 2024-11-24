import "dotenv/config";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let env = process.env;

let IS_LIVE = parseInt(env.IS_LIVE);

let PRIVATE_KEY = fs.readFileSync(path.join(__dirname, "./key/private.key"));
let PUBLIC_KEY = fs.readFileSync(path.join(__dirname, "./key/public.key"));

const Config = {
  SQL_DATABASE: IS_LIVE ? env.LIVE_SQL_DATABASE : env.SQL_DATABASE,
  SQL_USERNAME: IS_LIVE ? env.LIVE_SQL_USERNAME : env.SQL_USERNAME,
  SQL_PASSWORD: IS_LIVE ? env.LIVE_SQL_PASSWORD : env.SQL_PASSWORD,
  SQL_HOST: IS_LIVE ? env.LIVE_SQL_HOST : env.SQL_HOST,
  SQL_PORT: IS_LIVE ? env.LIVE_SQL_PORT : env.SQL_PORT,
  PORT: env.PORT,
  LOG_ROTATE_SIZE: "10M",
  LOG_ROTATE_INTERVAL: "24h",
  LOG_ROTATE_FILES: 7,
  FILE_LOGGER: env.FILE_LOGGER,
  PRIVATE_KEY,
  PUBLIC_KEY,
  IS_LIVE,
};
export default Object.freeze(Config);
