const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectDb = require("./db/connect");

// router
const transRouter = require("./routes/transaction");

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1", transRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    connectDb(process.env.MONGO_URL);
    console.log("Database Connected");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
