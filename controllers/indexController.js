const fileService = require("../services/fileService");
const folderService = require("../services/folderService");

async function getRenderIndex(req, res) {
    try {
        const user = req.user;
        const allFolders = req.user ? await folderService.showFolders(user.id) : [];
        const allFiles = req.user ? await fileService.showFiles(user.id) : [];

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