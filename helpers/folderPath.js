async function folderPath(endFolder, fetchFolder) {
    const path = [];
    let currentFolder = endFolder;

    while (currentFolder) {
        path.push(currentFolder.title);
        if (!currentFolder.parentId) break;
        currentFolder = await fetchFolder(currentFolder.parentId);
    }

    return path.reverse();
}

module.exports = folderPath;