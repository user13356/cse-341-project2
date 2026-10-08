const express = require("express");

const router = express.Router();

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const ensureAuthenticated = require("../middleware/auth");

const {
  validate,
  mongoIdValidation,
  projectValidation
} = require("../middleware/validation");

/*
 * GET all projects
 */
router.get(
  "/",
  ensureAuthenticated,
  getProjects
);

/*
 * GET one project
 */
router.get(
  "/:id",
  ensureAuthenticated,
  mongoIdValidation,
  validate,
  getProjectById
);

/*
 * POST project
 */
router.post(
  "/",
  ensureAuthenticated,
  projectValidation,
  validate,
  createProject
);

/*
 * PUT project
 */
router.put(
  "/:id",
  ensureAuthenticated,
  mongoIdValidation,
  projectValidation,
  validate,
  updateProject
);

/*
 * DELETE project
 */
router.delete(
  "/:id",
  ensureAuthenticated,
  mongoIdValidation,
  validate,
  deleteProject
);

module.exports = router;
