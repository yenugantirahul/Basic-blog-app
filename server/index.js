const express = require("express");

const app = express();

const cors = require("cors");
app.use(cors());
const bodyparser = require("body-parser");
const tasksRouter = require("./routes/taskRoutes");
const Todo = require("./models/taskModel");
const { homeRoute } = require("./controllers/task");
require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 8001;
app.use(bodyparser.json());
app.use("/", tasksRouter);

// app.get("/", homeRoute);

app.listen(PORT, () => {
  console.log(`Serever is listening on port ${PORT}`);
});
