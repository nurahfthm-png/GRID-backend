const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  deleteTask,
  updateTask
} = require("../controllers/task.controller");


router.post("/", createTask);

router.get("/", getTasks);


router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;