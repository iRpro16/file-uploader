const fileService = require("../services/fileService");
const folderService = require("../services/folderService");

async function getRenderIndex(req, res) {
    const allFiles = req.user ? await fileService.showFiles(req.user.id) : [];
    const allFolders = req.user ? await folderService.showFolders(req.user.id) : [];
    res.render("index", {
        user: req.user,
        files: allFiles,
        folders: allFolders
    })
}

module.exports = {
    getRenderIndex
}