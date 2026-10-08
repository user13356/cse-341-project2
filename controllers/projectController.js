const Project = require("../models/Project");

/*
 * GET /projects
 */
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user._id
    }).sort({
      createdAt: -1
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve projects.",
      error: error.message
    });
  }
};

/*
 * GET /projects/:id
 */
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found."
      });
    }

    return res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error("Get project error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve project.",
      error: error.message
    });
  }
};

/*
 * POST /projects
 */
const createProject = async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (endDate < startDate) {
      return res.status(400).json({
        success: false,
        message: "End date cannot be before start date."
      });
    }

    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      client: req.body.client,
      status: req.body.status,
      priority: req.body.priority,
      budget: req.body.budget,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      owner: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: project
    });
  } catch (error) {
    console.error("Create project error:", error);

    return res.status(400).json({
      success: false,
      message: "Unable to create project.",
      error: error.message
    });
  }
};

/*
 * PUT /projects/:id
 */
const updateProject = async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (endDate < startDate) {
      return res.status(400).json({
        success: false,
        message: "End date cannot be before start date."
      });
    }

    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      {
        name: req.body.name,
        description: req.body.description,
        client: req.body.client,
        status: req.body.status,
        priority: req.body.priority,
        budget: req.body.budget,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: project
    });
  } catch (error) {
    console.error("Update project error:", error);

    return res.status(400).json({
      success: false,
      message: "Unable to update project.",
      error: error.message
    });
  }
};

/*
 * DELETE /projects/:id
 */
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
      deletedId: req.params.id
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete project.",
      error: error.message
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
