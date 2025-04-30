const fileService = require("../services/fileService");

async function getUploadFile(req, res) {
    const folderId = req.params.folderId;
    res.render("file", { folderId });
}

async function postUploadfile(req, res) {
    const folderId  = req.params.folderId;
    await fileService.createFile(
        req.file.originalname,
        req.file.path,
        Number(folderId),
        req.user.id,
    )
    res.redirect("/");
}

async function getShowFolderFiles(req, res) {
    const allFolderFiles = await fileService.showFolderFiles(
        req.user.id,
        Number(req.params.folderId)
    )
    res.render("showFiles", {
        allFiles: allFolderFiles
    })
}


module.exports = {
    getUploadFile,
    postUploadfile,
    getShowFolderFiles
}