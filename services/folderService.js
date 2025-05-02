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

async function showFolder(folderId) {
    const folder = await prisma.folder.findUnique({
        where: { id: folderId }
    })
    return folder;
}

async function updateFolder(folderId, newFolderName) {
    await prisma.folder.update({
        where: {
            id: folderId,
        },
        data: {
            title: newFolderName,
        }
    })
}

module.exports = {
    createFolder,
    showFolders,
    deleteFolder,
    updateFolder,
    showFolder
}