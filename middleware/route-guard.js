const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login-form', {
        errorMessage: 'Please log in to continue'
    })
}

const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
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