const fileService = require("../services/fileService");
const folderService = require("../services/folderService");

async function getUploadFile(req, res) {
    res.render("forms/file", { 
        folderId: null
    });
}

async function postUploadFile(req, res) {
    try {
        const file = req.file; 
        const publicUrl = await fileService.uploadToSupabase(file);

        await fileService.createFile(
            file.originalname,
            publicUrl,
            file.size.toString(),
            req.user.id,
        )

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Upload failed");
    }
}

async function getUploadFileInFolder(req, res) {
    const folderId = req.params.folderId;
    res.render("forms/file", { folderId });
}

async function postUploadFileInFolder(req, res) {
    try {
        const file = req.file;
        const folderId = req.params.folderId;
        const publicUrl = await fileService.uploadToSupabase(file);

        await fileService.createFile(
            file.originalname,
            publicUrl,
            file.size.toString(),
            req.user.id,
            folderId
        )

        res.redirect(`/folder/${folderId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Upload failed");
    }
    
}

async function getDeleteFile(req, res) {
    try {
        const fileId = req.params.fileId
        const file = await fileService.showFile(fileId);

        // delete from prisma and supabase
        await fileService.deleteFile(fileId);
        await fileService.deleteFileFromSupabase([file]);

        res.redirect("/");
    } catch (err) {
        console.error("Error deleting file:", err);
        res.status(500).send("Failed to delete folder");
    }
}

module.exports = {
    getUploadFile,
    postUploadFile,
    postUploadFileInFolder,
    getUploadFileInFolder,
    getDeleteFile
}