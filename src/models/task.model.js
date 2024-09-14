const mongoose = require("mongoose");
const { Schema, model } = mongoose; // Importando Schema e model de mongoose

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;
