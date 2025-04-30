const folderService = require("../services/folderService");

async function getCreateFolder(req, res) {
    res.render("forms/folder");
}

async function postCreateFolder(req, res) {
    await folderService.createFolder(
        req.body.folder_name,
        req.user.id
    )
    res.redirect("/");
}

module.exports = {
    getCreateFolder,
    postCreateFolder
}