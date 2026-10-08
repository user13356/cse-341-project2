const {
  body,
  param,
  validationResult
} = require("express-validator");

/*
 * Runs after the validation rules.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array()
    });
  }

  next();
};

/*
 * Validate MongoDB ID.
 */
const mongoIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("The ID must be a valid MongoDB ObjectId.")
];

/*
 * Project validation.
 *
 * Used by BOTH POST and PUT.
 */
const projectValidation = [
  body("name")
    .trim()
    .isLength({
      min: 3,
      max: 100
    })
    .withMessage(
      "Name must contain between 3 and 100 characters."
    ),

  body("description")
    .trim()
    .isLength({
      min: 10,
      max: 500
    })
    .withMessage(
      "Description must contain between 10 and 500 characters."
    ),

  body("client")
    .trim()
    .isLength({
      min: 2,
      max: 100
    })
    .withMessage(
      "Client must contain between 2 and 100 characters."
    ),

  body("status")
    .isIn([
      "planning",
      "active",
      "completed",
      "cancelled"
    ])
    .withMessage(
      "Status must be planning, active, completed, or cancelled."
    ),

  body("priority")
    .isIn([
      "low",
      "medium",
      "high"
    ])
    .withMessage(
      "Priority must be low, medium, or high."
    ),

  body("budget")
    .isFloat({
      min: 0
    })
    .withMessage(
      "Budget must be a number greater than or equal to zero."
    ),

  body("startDate")
    .isISO8601()
    .withMessage(
      "Start date must be a valid date."
    ),

  body("endDate")
    .isISO8601()
    .withMessage(
      "End date must be a valid date."
    )
];

/*
 * Task validation.
 *
 * Used by BOTH POST and PUT.
 */
const taskValidation = [
  body("title")
    .trim()
    .isLength({
      min: 3,
      max: 100
    })
    .withMessage(
      "Title must contain between 3 and 100 characters."
    ),

  body("description")
    .trim()
    .isLength({
      min: 10,
      max: 500
    })
    .withMessage(
      "Description must contain between 10 and 500 characters."
    ),

  body("projectId")
    .isMongoId()
    .withMessage(
      "Project ID must be a valid MongoDB ObjectId."
    ),

  body("assignedTo")
    .trim()
    .notEmpty()
    .withMessage(
      "Assigned user is required."
    ),

  body("status")
    .isIn([
      "todo",
      "in-progress",
      "completed"
    ])
    .withMessage(
      "Status must be todo, in-progress, or completed."
    ),

  body("priority")
    .isIn([
      "low",
      "medium",
      "high"
    ])
    .withMessage(
      "Priority must be low, medium, or high."
    ),

  body("dueDate")
    .isISO8601()
    .withMessage(
      "Due date must be a valid date."
    ),

  body("estimatedHours")
    .isFloat({
      min: 0
    })
    .withMessage(
      "Estimated hours must be greater than or equal to zero."
    ),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage(
      "Completed must be true or false."
    )
];

module.exports = {
  validate,
  mongoIdValidation,
  projectValidation,
  taskValidation
};
