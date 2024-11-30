import * as rfs from "rotating-file-stream";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const accessLogStream = rfs.createStream("access.log", {
  interval: config.LOG_ROTATE_INTERVAL,
  maxFiles: config.LOG_ROTATE_FILES,
  path: path.join(__dirname, "../../logs"),
  compress: "gzip",
  size: config.LOG_ROTATE_SIZE,
});

export default morgan("combined", { stream: accessLogStream });
