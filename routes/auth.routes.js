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
        .catch(error => next(new Error(error)))

})

router.get("/login", isLoggedOut, (req, res, next) => res.render("auth/login-form"))

router.post("/login", isLoggedOut, (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render("auth/login-form", { errorMessage: "The username doesn't exist." })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render("auth/login-form", { errorMessage: "Incorret password" })
                return
            } else {
                req.app.locals.globalIsLogin = true
                req.app.locals.userId = user.id
                req.session.currentUser = user
                res.redirect("/")
            }
        })
        .catch(error => next(new Error(error)))
})

router.post('/logout', isLoggedIn, (req, res) => {
    req.app.locals.globalIsLogin = false
    req.session.destroy()
    res.redirect('/')
})


module.exports = router

