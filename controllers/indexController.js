async function getRenderIndex(req, res) {
    res.render("index", {
        user: req.user
    })
}

module.exports = {
    getRenderIndex
}