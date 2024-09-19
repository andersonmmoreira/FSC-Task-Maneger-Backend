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
app.get("/tasks/:id", async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).send(tasks); // Retorna as tarefas em formato JSON
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota para buscar uma tarefa por ID
app.get("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).send("Tarefa não encontrada.");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota para criar uma nova tarefa
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);

    await newTask.save();

    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota para atualizar uma tarefa existente por ID
app.patch("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;

    const taskToUpdate = await TaskModel.findById(taskId);
    const allowedUpdates = ["isCompleted"];
    const requestedUpdates = Object.keys(taskData);

    for (update of requestedUpdates) {
      if (!allowedUpdates.includes(update)) {
        taskToUpdate[update] = taskData[update];
      } else {
        return res.status(500).send("Atualização inválida.");
      }
    }

    await taskToUpdate.save();
    return res.status(200).send(taskToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota para deletar uma tarefa por ID
app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const taskToDelete = await TaskModel.findById(taskId);
    if (!taskToDelete) {
      return res.status(404).send("Essa tarefa não foi encontrada.");
    }

    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    res.status(200).send(deletedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Iniciar o servidor na porta 8000
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
