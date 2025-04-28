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

async function findUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        }
    })
    return user;
}

async function findUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    })
    return user;
}

module.exports = {
    createUser,
    findUserById,
    findUserByUsername
}