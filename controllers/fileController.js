const fileService = require("../services/fileService");

async function getShowFile(req, res) {
    const fileId = Number(req.params.fileId);
    const file  = await fileService.showFile(fileId);
    res.render("files/show", { 
        file: file
    });
}

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
        const folderId = Number(req.params.folderId);
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

async function getShowFolderFiles(req, res) {
    const allFolderFiles = await fileService.showFolderFiles(
        req.user.id,
        Number(req.params.folderId)
    )
    res.render("files/list", {
        folderId: req.params.folderId,
        allFiles: allFolderFiles
    })
}


module.exports = {
    getUploadFile,
    postUploadFile,
    getShowFolderFiles,
    postUploadFileInFolder,
    getUploadFileInFolder,
    getShowFile
}