const fileService = require("../services/fileService");

async function getRenderIndex(req, res) {
    const allFiles = req.user.id ? await fileService.showFiles(req.user.id) : [];
    res.render("index", {
        user: req.user,
        files: allFiles
    })
}

module.exports = {
    getRenderIndex
}