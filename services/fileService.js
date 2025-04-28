const prisma = require("../prisma/client");

async function createFile(filename, path, folderId, userId) {
    await prisma.file.create({
        data: {
            filename: filename,
            path: path,
            folderId: folderId || null,
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

module.exports = {
    createFile,
    showFiles
}