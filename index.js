const express = require("express");
const dotenv = require("dotenv");
const TaskRouter = require("./src/routes/task.routes");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();

const app = express();
app.use(express.json());

// Conectando ao banco de dados
connectToDatabase();

app.use("/tasks", TaskRouter);

// Iniciar o servidor na porta 8000
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
