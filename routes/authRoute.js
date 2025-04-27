const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

// GET method for Sign Up form
authRouter.get("/signup", authController.getSignUp);

module.exports = authRouter;