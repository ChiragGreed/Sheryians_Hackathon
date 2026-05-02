import { body, validationResult } from 'express-validator'

const validationHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next();
}


export const registerValidator = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("username is required")
        .isLength({ min: 3 })
        .withMessage("username must be at least 3 characters long"),

    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/\d/)
        .withMessage("Password must contain a number"),

    body("organizationName")
        .trim()
        .notEmpty()
        .withMessage("organizationName is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("organizationName must be between 2 and 100 characters"),

    validationHandler

]

export const loginValidator = [
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/\d/)
        .withMessage("Password must contain a number"),


    validationHandler
]