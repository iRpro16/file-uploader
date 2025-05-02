const fileService = require("../services/fileService");
const folderService = require("../services/folderService");

async function getRenderIndex(req, res) {
    const allFolders = req.user ? await folderService.showFolders(req.user.id) : [];
    const allFiles = req.user ? await fileService.showFiles(req.user.id) : [];
    res.render("index", {
        user: req.user,
        folders: allFolders,
        files: allFiles,
    })
}

module.exports = {
    getRenderIndex
}