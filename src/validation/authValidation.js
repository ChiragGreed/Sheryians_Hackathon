import { body, validationResult } from 'express-validator'

const validationHandler = (req, res, next) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.status(400).json({ errors: erros.array() })
    }

    next();
}


export const registerValidator = [
    body("fullname")
        .isLength({ min: 3 })
        .withMessage("Fullname must be at least 3 characters long"),

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