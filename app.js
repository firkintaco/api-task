require("dotenv").config();
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const bodyParser = require("body-parser");
const port = 3000;
const connectDB = require("./db/db");

// middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Routes for app

app.use("/api/v1/tasks", tasks);

// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')        - create a new task
// app.get('/api/v1/tasks/:id')     - get single task by id
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id')  - delete task
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server is listening on " + port);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
