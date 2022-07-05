const router = require("express").Router()

const User = require("./../models/User.model")
const Cart = require("../models/Cart.model")
const { isLoggedIn, isLoggedOut, checkRole } = require("../middleware/route-guard")

const bcrypt = require('bcryptjs')
const saltRounds = 10

router.get("/register", isLoggedOut, (req, res, next) => res.render("auth/register-form"))

router.post("/register", isLoggedOut, (req, res, next) => {

    const { username, email, password: plainPassword } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(hashedPassword => {
            User.create({ username, email, password: hashedPassword })
            Cart.create({ user: req.session.currentUser })
            console.log('currentUser', req.session.currentUser)
        })
        .then(() => res.redirect("/login"))
        .catch(error => next(error))

})

router.get("/login", isLoggedOut, (req, res, next) => res.render("auth/login-form"))

router.post("/login", isLoggedOut, (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render("auth/login-form", { errorMessage: "User not registered" })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render("auth/login-form", { errorMessage: "Incorret password" })
                return
            } else {

                req.session.currentUser = user
                res.redirect("/")
            }
        })
        .catch(error => next(error))
})

router.post('/logout', isLoggedIn, (req, res) => {
    req.session.destroy()
    res.redirect('/')
})


module.exports = router

