const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Student Management API is running"
  });
});

app.use("/students", studentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});