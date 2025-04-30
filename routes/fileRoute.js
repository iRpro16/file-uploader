const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// GET method for upload file
fileRouter.get("/upload-file", fileController.getUploadFile);
// POST method for upload file
fileRouter.post("/upload-file", upload.single('uploaded_file'), fileController.postUploadfile);

// GET method to show all files in folder
fileRouter.get("/folder/:folderId", fileController.getShowFolderFiles);

// POST method for upload file with folder ID
fileRouter.post("/folder/:folderId/upload-file", upload.single('uploaded_file'), fileController.postUploadfile);


module.exports = fileRouter;