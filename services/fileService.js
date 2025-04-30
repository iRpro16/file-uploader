const prisma = require("../prisma/client");

async function createFile(filename, path, folderId = null, userId) {
    await prisma.file.create({
        data: {
            filename: filename,
            path: path,
            folderId: folderId,
            userId: userId,
        }
    })
}

async function showFiles(userId) {
    const allFiles = await prisma.file.findMany({
        where: {
            userId: userId
        }
    })
    return allFiles;
}

async function showFolderFiles(userId, folderID) {
    const allFiles = await prisma.file.findMany({
        where: {
            userId: userId,
            folderId: folderID
        }
    })
    return allFiles;
}

module.exports = {
    createFile,
    showFiles,
    showFolderFiles
}