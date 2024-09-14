const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();

const app = express();
app.use(express.json());
// Conectando ao banco de dados
connectToDatabase();

// Rota para listar todas as tarefas
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).send(tasks); // Retorna as tarefas em formato JSON
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);

    await newTask.save();

    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
