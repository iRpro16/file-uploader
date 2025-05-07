const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

// GET method for create folder
folderRouter.get("/create-folder", folderController.getCreateFolder);
// POST method for create folder
folderRouter.post("/create-folder", folderController.postCreateFolder);

// GET method to show all children folders
folderRouter.get("/folder/:folderId", folderController.getShowAllInFolder);

// GET method to create nested Folders
folderRouter.get("/folder/create/:folderId", folderController.getNestedFolder);
// POST method to create nested Folders
folderRouter.post("/folder/create/:folderId", folderController.postNestedFolder);

// GET method to delete folder and its files
folderRouter.get("/delete/:folderId", folderController.getDeleteFolder);

// GET method to edit folder
folderRouter.get("/edit/:folderId", folderController.getEditFolder);
// POST method to edit folder
folderRouter.post("/edit/:folderId", folderController.postEditFolder);

module.exports = folderRouter;