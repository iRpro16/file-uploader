const prisma = require("../prisma/client");

async function createFolder(title, userId) {
    await prisma.folder.create({
        data: {
            title: title,
            userId: userId
        }
    })
}

async function showFolders(userId) {
    const allFolders = await prisma.folder.findMany({
        where: { userId: userId }
    })
    return allFolders;
}

async function deleteFolder(folderId) {
    await prisma.folder.delete({
        where: {
            id: folderId,
        }
    })
}

module.exports = {
    createFolder,
    showFolders,
    deleteFolder
}