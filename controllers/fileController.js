const fileService = require("../services/fileService");

async function getUploadFile(req, res) {
    res.render("file", { 
        folderId: null
    });
}

async function postUploadFile(req, res) {
    await fileService.createFile(
        req.file.originalname,
        req.file.path,
        req.user.id,
    )
    res.redirect("/");
}

async function getUploadFileInFolder(req, res) {
    const folderId = req.params.folderId;
    res.render("file", { folderId });
}

async function postUploadFileInFolder(req, res) {
    const folderId = Number(req.params.folderId);
    await fileService.createFile(
        req.file.originalname,
        req.file.path,
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
    res.render("showFiles", {
        folderId: req.params.folderId,
        allFiles: allFolderFiles
    })
}


module.exports = {
    getUploadFile,
    postUploadFile,
    getShowFolderFiles,
    postUploadFileInFolder,
    getUploadFileInFolder
}