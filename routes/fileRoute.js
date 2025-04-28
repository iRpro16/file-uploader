const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// GET method for upload file
fileRouter.get("/upload-file/:folderId?", fileController.getUploadFile);
// POST method for upload file
fileRouter.post("/upload-file/:folderId?", upload.single('uploaded_file'), fileController.postUploadfile);

module.exports = fileRouter;