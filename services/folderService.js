const prisma = require("../prisma/client");

async function createFolder(title, userId, parentId = null) {
    await prisma.folder.create({
        data: {
            title: title,
            userId: userId,
            parentId,
        }
    })
}

async function showFolders() {
    const allFolders = await prisma.folder.findMany({
        where: { parentId: null }
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

async function showChildrenInFolder(parentId) {
    const childrenInFolder = await prisma.folder.findUnique({
        where: {
            id: parentId
        },
        include: {
            children: true,
        }
    })
    return childrenInFolder;
}

module.exports = {
    createFolder,
    showFolders,
    deleteFolder,
    updateFolder,
    showFolder,
    showChildrenInFolder
}