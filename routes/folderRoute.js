const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

// GET method for create folder
folderRouter.get("/create-folder", folderController.getCreateFolder);
// POST method for create folder
folderRouter.post("/create-folder", folderController.postCreateFolder);

// GET method to delete folder and its files
folderRouter.get("/delete/:folderId", folderController.getDeleteFolder);


module.exports = folderRouter;