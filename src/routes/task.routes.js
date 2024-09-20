const express = require("express");

const TaskController = require("../controllers/task.controller");

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
  return new TaskController(req, res).delete();
});

module.exports = router;
