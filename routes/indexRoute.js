const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

// GET method for index
indexRouter.get("/", indexController.getRenderIndex);

module.exports = indexRouter;