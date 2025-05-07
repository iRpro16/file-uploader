const fileService = require("../services/fileService");
const folderService = require("../services/folderService");

async function getRenderIndex(req, res) {
    try {
        const allFolders = req.user ? await folderService.showFolders() : [];
        const allFiles = req.user ? await fileService.showFiles(req.user.id) : [];

        res.render("index", {
            user: req.user,
            folders: allFolders,
            files: allFiles,
        })
    } catch (err) {
        console.error("Error loading index file: ", err);
        res.status(500).send("Failed to load page");
    }
}

module.exports = {
    getRenderIndex
}