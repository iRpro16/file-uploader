const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

module.exports = function(passport) {
    // serialize user for session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    // deserialize user for session
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            done(null, user);
        } catch (err) {
            done(err);
        }
    })

    // LocalStrategy
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        username: username
                    }
                })

                if (!user) {
                    return done(null, false, { message: "Incorrect username" });
                }

                const match = await bcrypt.compare(password, user.password);
                if(!match) {
                    return done(null, false, { message: "Incorect password" });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    )
}