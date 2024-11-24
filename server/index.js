import app from "./src/app.js";
import { Model } from "./src/database/connect.js";

const PORT = 5000;

async function startServer() {
  try {
    await Model.authenticate();
    app.listen(PORT, () =>
      console.log(`Server is running at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
}

startServer();
