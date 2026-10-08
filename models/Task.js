const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    assignedTo: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      required: true,
      enum: [
        "todo",
        "in-progress",
        "completed"
      ]
    },

    priority: {
      type: String,
      required: true,
      enum: [
        "low",
        "medium",
        "high"
      ]
    },

    dueDate: {
      type: Date,
      required: true
    },

    estimatedHours: {
      type: Number,
      required: true,
      min: 0
    },

    completed: {
      type: Boolean,
      default: false
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("Task", taskSchema);
