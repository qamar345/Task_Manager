const express = require("express");
const cors = require("cors");
const TestConnection = require("./config/test.connection");
const syncDatabase = require("./config/syncDb");
require("dotenv").config();
const port = process.env.PORT;
const authRouter = require("./routes/auth.routes");
const workSpaceRouter = require("./routes/workspace.routes");
const projectRouter = require("./routes/project.routes");
const taskRouter = require("./routes/task.routes");

const app = express();
app.use(express.json());
app.use(cors());
TestConnection();
syncDatabase();

app.use("/auth", authRouter);
app.use("/workspaces", workSpaceRouter);
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server Running on port: ${port}`);
});
