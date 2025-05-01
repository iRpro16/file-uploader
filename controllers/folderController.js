const folderService = require("../services/folderService");
const fileService = require("../services/fileService");

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

async function getDeleteFolder(req, res) {
    try {
        const folderId = Number(req.params.folderId);
        const deletedFiles = await fileService.showFolderFiles(req.user.id, folderId);
    
        // delete from prisma schemas
        await fileService.deleteFilesFromFolder(folderId);
        await folderService.deleteFolder(folderId);

        if (deletedFiles.length > 0) {
            // delete from supabase
            await fileService.deleteFromSupabase(deletedFiles);
        }

        res.redirect("/");
    } catch(err) {
        console.error("Error deleting folder:", err);
        res.status(500).send("Failed to delete folder");
    }
}
module.exports = {
    getCreateFolder,
    postCreateFolder,
    getDeleteFolder
}