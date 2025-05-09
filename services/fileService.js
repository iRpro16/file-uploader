const prisma = require("../prisma/client");
const supabase = require('../config/supabase');

async function createFile(filename, path, size, userId, folderId = null) {
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
            userId: userId,
            folderId: null
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

async function uploadToSupabase(file) {
    const { data, error } = await supabase.storage
        .from('images')
        .upload(file.originalname, file.buffer, {
            contentType: file.mimetype,
        });

        if (error) throw error;

        // get pubic url of the uploaded file
        const { data: urlData } = supabase.storage
            .from('images')
            .getPublicUrl(data.path);
        return urlData.publicUrl;
}

async function deleteFilesFromFolder(folderId) {
    await prisma.file.deleteMany({
        where: {
            folderId: folderId
        }
    })
}

async function deleteFilesFromSupabase(deletedFiles) {
    const fileURLs = deletedFiles.map(file => file.filename);
    const { data, error } = await supabase.storage
        .from('images')
        .remove(fileURLs);
}

async function deleteFileFromSupabase(fileArray) {
    const fileURLs = fileArray.map(file => file.filename);
    const { data, error } = await supabase.storage
        .from('images')
        .remove(fileURLs);
}

async function deleteFile(fileId) {
    await prisma.file.delete({
        where: { id: fileId }
    })
}

module.exports = {
    createFile,
    showFiles,
    showFolderFiles,
    showFile,
    uploadToSupabase,
    deleteFilesFromFolder,
    deleteFilesFromSupabase,
    deleteFileFromSupabase,
    deleteFile
}