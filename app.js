const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "/public");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
// Routers
const indexRouter = require("./routes/indexRoute");
const authRouter = require("./routes/authRoute");
const fileRouter = require("./routes/fileRoute");
const folderRouter = require("./routes/folderRoute");
require("./config/passport")(passport);

// setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));

// session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 //ms
    },
    secret: "pelicans",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000, // ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}));
app.use(passport.session());
app.use(express.urlencoded( {extended: false }));

// routes
app.use(indexRouter);
app.use(authRouter);
app.use(fileRouter);
app.use(folderRouter);
// port
app.listen(3000, () => {
    console.log("Listening to on PORT: 3000");
})