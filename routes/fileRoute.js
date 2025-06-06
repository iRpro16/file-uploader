const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

// GET method for upload file
fileRouter.get("/upload-file", fileController.getUploadFile);
// POST method for upload file
fileRouter.post("/upload-file", upload.single('uploaded_file'), fileController.postUploadFile);

// GET method for upload file with folder ID
fileRouter.get("/folder/:folderId/upload-file", fileController.getUploadFileInFolder);
// POST method for upload file with folder ID
fileRouter.post("/folder/:folderId/upload-file", 
    upload.single('uploaded_file'),
    fileController.postUploadFileInFolder
);

// GET method for delete file
fileRouter.get("/file/:fileId/delete", fileController.getDeleteFile);


module.exports = fileRouter;