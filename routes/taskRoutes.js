const express = require("express");

const router = express.Router();

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const ensureAuthenticated = require("../middleware/auth");

const {
  validate,
  mongoIdValidation,
  taskValidation
} = require("../middleware/validation");

/*
 * GET all tasks
 */
router.get(
  "/",
  ensureAuthenticated,
  getTasks
);

/*
 * GET one task
 */
router.get(
  "/:id",
  ensureAuthenticated,
  mongoIdValidation,
  validate,
  getTaskById
);

/*
 * POST task
 */
router.post(
  "/",
  ensureAuthenticated,
  taskValidation,
  validate,
  createTask
);

/*
 * PUT task
 */
router.put(
  "/:id",
  ensureAuthenticated,
  mongoIdValidation,
  taskValidation,
  validate,
  updateTask
);

/*
 * DELETE task
 */
router.delete(
  "/:id",
  ensureAuthenticated,
  mongoIdValidation,
  validate,
  deleteTask
);

module.exports = router;
