const prisma = require("../prisma/client");

async function createFile(filename, path, size, folderId = null, userId) {
    await prisma.file.create({
        data: {
            filename: filename,
            path: path,
            size: size,
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

async function showFile(fileId) {
    const file = await prisma.file.findUnique({
        where: {
            id: fileId
        }
    })
    return file;
}

module.exports = {
    createFile,
    showFiles,
    showFolderFiles,
    showFile
}