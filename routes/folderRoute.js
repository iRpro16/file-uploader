const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

// GET method for create folder
folderRouter.get("/create-folder", folderController.getCreateFolder);
// POST method for create folder
folderRouter.post("/create-folder", folderController.postCreateFolder);

// GET method to view folder files


module.exports = folderRouter;