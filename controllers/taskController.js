const Task = require("../models/Task");
const Project = require("../models/Project");

/*
 * GET /tasks
 */
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.email
    })
      .populate("projectId")
      .sort({
        createdAt: -1
      });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve tasks.",
      error: error.message
    });
  }
};

/*
 * GET /tasks/:id
 */
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user.email
    }).populate("projectId");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    return res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error("Get task error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve task.",
      error: error.message
    });
  }
};

/*
 * POST /tasks
 */
const createTask = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.body.projectId,
      owner: req.user._id
    });

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "The selected project does not belong to the logged-in user."
      });
    }

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      projectId: req.body.projectId,
      assignedTo: req.user.email,
      status: req.body.status,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      estimatedHours: req.body.estimatedHours,
      completed:
        req.body.completed !== undefined
          ? req.body.completed
          : false
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: task
    });
  } catch (error) {
    console.error("Create task error:", error);

    return res.status(400).json({
      success: false,
      message: "Unable to create task.",
      error: error.message
    });
  }
};

/*
 * PUT /tasks/:id
 */
const updateTask = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.body.projectId,
      owner: req.user._id
    });

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "The selected project does not belong to the logged-in user."
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        assignedTo: req.user.email
      },
      {
        title: req.body.title,
        description: req.body.description,
        projectId: req.body.projectId,
        status: req.body.status,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        estimatedHours: req.body.estimatedHours,
        completed: req.body.completed
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: task
    });
  } catch (error) {
    console.error("Update task error:", error);

    return res.status(400).json({
      success: false,
      message: "Unable to update task.",
      error: error.message
    });
  }
};

/*
 * DELETE /tasks/:id
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      assignedTo: req.user.email
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
      deletedId: req.params.id
    });
  } catch (error) {
    console.error("Delete task error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete task.",
      error: error.message
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
