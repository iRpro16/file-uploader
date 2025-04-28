const { body } = require("express-validator");

const validateUser = [
    body('fullname')
        .exists({checkFalsy: true}).withMessage('Please type your full name'),
    body('username')
        .exists({checkFalsy: true}).withMessage('Please type a username '),
    body('email')
        .exists({checkFalsy: true}).withMessage('Please type an email'),
    body('password')
        .exists({checkFalsy: true}).withMessage('Please type a password'),
    body('confirm-password')
        .exists({checkFalsy: true}).withMessage('Please confirm password')
        .custom((value, {req}) => value === req.body.password).withMessage("The password do not match"),
]

module.exports = validateUser;