const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const authService = require("../services/authService");
const passport = require('passport');

async function getLogIn(req, res) {
    res.render("login");
}

async function postLogIn(req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })(req, res, next);
}

async function getLogOut(req, res, next) {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
}

async function getSignUp(req, res) {
    res.render("signup");
}

async function postSignUp(req, res, next) {
    const errors =validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).render("signup", {
            errors: errors.array(),
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await authService.createUser(
            req.body.fullname,
            req.body.username,
            req.body.email,
            hashedPassword
        )
        res.redirect("/");
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    getLogIn,
    postLogIn,
    getLogOut,
    getSignUp,
    postSignUp
}