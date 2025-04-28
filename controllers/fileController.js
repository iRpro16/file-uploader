const fileService = require("../services/fileService");

async function getUploadFile(req, res) {
    res.render("file");
}

async function postUploadfile(req, res) {
    const { folderId } = req.params;
    await fileService.createFile(
        req.file.originalname,
        req.file.path,
        folderId,
        req.user.id,
    )
    res.redirect("/");
}

module.exports = {
    getUploadFile,
    postUploadfile
}