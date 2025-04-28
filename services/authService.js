const prisma = require("../prisma/client");

async function createUser(fullname, username, email, password) {
    await prisma.user.create({
        data: {
            name: fullname,
            email: email,
            username: username,
            password: password
        },
    })
}

module.exports = {
    createUser
}