import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  moveTask,
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/", protect, createTask);        // Create a task
router.get("/", protect, getTasks);            // Get all tasks
router.put("/:id", protect, updateTask);       // Update a task
router.delete("/:id", protect, deleteTask);    // Delete a task
router.put("/move/:id", protect, moveTask);    // Move a task between statuses

export default router;
