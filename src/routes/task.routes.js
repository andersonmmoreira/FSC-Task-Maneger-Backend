const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

const router = express.Router();

// Rota para listar todas as tarefas
router.get("/", async (req, res) => {
  return new TaskController(req, res).getTasks();
});

// Rota para buscar uma tarefa por ID
router.get("/:id", async (req, res) => {
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
router.post("/:id", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);

    await newTask.save();

    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota para atualizar uma tarefa existente por ID
router.patch("/:id", async (req, res) => {
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
