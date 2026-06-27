const { body, validationResult } = require("express-validator");

const validateTask = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 5, max: 500 })
    .withMessage("Description must be between 5 and 500 characters"),

  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Invalid status"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid due date"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = { validateTask };