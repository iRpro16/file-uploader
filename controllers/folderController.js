const folderService = require("../services/folderService");
const fileService = require("../services/fileService");

async function getCreateFolder(req, res) {
    res.render("forms/folder", {
        folder: null
    });
}

async function postCreateFolder(req, res) {
    try {
        await folderService.createFolder(
            req.body.folder_name,
            req.user.id
        )
        res.redirect("/");
    } catch (err) {
        console.error("Error creating folder:", err);
        res.status(500).send("Failed to create folder");
    }
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

async function getEditFolder(req, res) {
    try {
        const folderId = Number(req.params.folderId);
        const folder = await folderService.showFolder(folderId);
    
        res.render("forms/folder", {
            folder: folder
        })
    } catch (err) {
        console.error("Error retrieving folder:", err);
        res.status(500).send("Failed to retrieve folder");
    }
}

async function postEditFolder(req, res) {
    try {
        const folderId = Number(req.params.folderId);
        const newFolderName = req.body.folder_name;
    
        await folderService.updateFolder(
            folderId,
            newFolderName
        )
    
        res.redirect("/");
    } catch (err) {
        console.error("Faile to update folder:", err);
        res.status(500).send("Failed to update folder");
    }
}

module.exports = {
    getCreateFolder,
    postCreateFolder,
    getDeleteFolder,
    getEditFolder,
    postEditFolder
}