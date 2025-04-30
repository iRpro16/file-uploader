const fileService = require("../services/fileService");

async function getShowFile(req, res) {
    const fileId = Number(req.params.fileId);
    const file  = await fileService.showFile(fileId);
    res.render("files/show", { 
        file: file
    });
}

async function getUploadFile(req, res) {
    res.render("forms/file", { 
        folderId: null
    });
}

async function postUploadFile(req, res) {
    const size = req.file.size;
    await fileService.createFile(
        req.file.originalname,
        req.file.path,
        size.toString(),
        req.user.id,
    )
    res.redirect("/");
}

async function getUploadFileInFolder(req, res) {
    const folderId = req.params.folderId;
    res.render("forms/file", { folderId });
}

async function postUploadFileInFolder(req, res) {
    const folderId = Number(req.params.folderId);
    const size = req.file.size;
    await fileService.createFile(
        req.file.originalname,
        req.file.path,
        size.toString(),
        folderId,
        req.user.id
    )
    res.redirect(`/folder/${folderId}`);
}

async function getShowFolderFiles(req, res) {
    const allFolderFiles = await fileService.showFolderFiles(
        req.user.id,
        Number(req.params.folderId)
    )
    res.render("files/list", {
        folderId: req.params.folderId,
        allFiles: allFolderFiles
    })
}


module.exports = {
    getUploadFile,
    postUploadFile,
    getShowFolderFiles,
    postUploadFileInFolder,
    getUploadFileInFolder,
    getShowFile
}