const folderService = require("../services/folderService");
const fileService = require("../services/fileService");
const folderPath = require("../helpers/folderPath");

async function getCreateFolder(req, res) {
    res.render("forms/folder", {
        folder: null
    });
}

async function postCreateFolder(req, res) {
    try {
        const { folder_name } = req.body;

        await folderService.createFolder(
            folder_name,
            req.user.id,
        )
        res.redirect("/");
    } catch (err) {
        console.error("Error creating folder:", err);
        res.status(500).send("Failed to create folder");
    }
}

async function getDeleteFolder(req, res) {
    try {
        const folderId = req.params.folderId
        const deletedFiles = await fileService.showFolderFiles(req.user.id, folderId);
    
        // delete from prisma schemas
        await fileService.deleteFilesFromFolder(folderId);
        await folderService.deleteFolder(folderId);

        if (deletedFiles.length > 0) {
            // delete from supabase
            await fileService.deleteFilesFromSupabase(deletedFiles);
        }

        res.redirect("/");
    } catch(err) {
        console.error("Error deleting folder:", err);
        res.status(500).send("Failed to delete folder");
    }
}

async function getEditFolder(req, res) {
    try {
        const folderId = req.params.folderId
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
        const folderId = req.params.folderId;
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

async function getNestedFolder(req, res) {
    const folderId = req.params.folderId;
    res.render("forms/subFolder", { folderId });
}

async function postNestedFolder(req, res) {
    try {
        const { folder_name } = req.body;
        const parentId = req.params.folderId;

        await folderService.createFolder(
            folder_name,
            req.user.id,
            parentId
        )
        res.redirect("/");
    } catch (err) {
        console.error("Error creating folder:", err);
        res.status(500).send("Failed to create folder");
    }
}

async function getShowAllInFolder(req, res) {
    try {
        const user = req.user;
        const folder = req.params.folderId ? await folderService.showFolder(req.params.folderId) : null;
        const allFolders = await folderService.showChildrenInFolder(folder.id);
        const path = await folderPath(folder, folderService.showFolder);
        const allFolderFiles = await fileService.showFolderFiles(
            user.id,
            folder.id
        )

        res.render("files/list", {
            user: user,
            folder: folder,
            folderPath: path,
            allFiles: allFolderFiles,
            allChildrenFolders: allFolders.children
        })

    } catch (err) {
        console.error("Error loading children folders: ", err);
        res.status(500).send("Failed to load children folders");
    }
}

module.exports = {
    getCreateFolder,
    postCreateFolder,
    getDeleteFolder,
    getEditFolder,
    postEditFolder,
    getNestedFolder,
    postNestedFolder,
    getShowAllInFolder
}