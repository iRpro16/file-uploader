const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const valideNewUser = require("../middlewares/validateNewUser");

// GET method for Sign Up form
authRouter.get("/signup", authController.getSignUp);
// POST method for Sign Up form
authRouter.post("/signup", valideNewUser, authController.postSignUp);

// GET method for Log In form
authRouter.get("/login", authController.getLogIn);
// POST method for Log In form
authRouter.post("/login", authController.postLogIn);

// GET method for Log Out form
authRouter.get("/logout", authController.getLogOut);

module.exports = authRouter;