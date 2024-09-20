const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

const router = express.Router();

// Rota para listar todas as tarefas
router.get("/", async (req, res) => {
  return new TaskController(req, res).getAll();
});

// Rota para buscar uma tarefa por ID
router.get("/:id", async (req, res) => {
  return new TaskController(req, res).getById();
});

// Rota para criar uma nova tarefa
router.post("/:id", async (req, res) => {
  return new TaskController(req, res).create();
});

// Rota para atualizar uma tarefa existente por ID
router.patch("/:id", async (req, res) => {
  return new TaskController(req, res).update();
});

// Rota para deletar uma tarefa por ID
router.delete("/:id", async (req, res) => {
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

module.exports = router;
