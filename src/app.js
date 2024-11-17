const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(bodyParser.json());
app.use(taskRoutes);

const PORT = 3000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
