const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        req.app.locals.globalIsLoggedIn = false
        return res.render('auth/login-form', { errorMessage: 'Please log in to continue' })
    }
    next()
}

const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        req.app.locals.globalIsLoggedIn = true
        return res.redirect('/')
    }
    next()
}

const checkRole = (...grantedRoles) => (req, res, next) => {
    grantedRoles.includes(req.session.currentUser.role) ? next() : res.render('auth/login-form', {
        errorMessage: 'Permission denied'
    })
}

module.exports = { isLoggedIn, isLoggedOut, checkRole }