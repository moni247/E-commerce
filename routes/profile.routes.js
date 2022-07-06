const router = require('express').Router()

const User = require('../models/User.model')
const Product = require('../models/Product.model')

const uploader = require('../config/cloudinary.config')

const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const { rolesChecker } = require('./../utils/roles-checker')

router.get('/:user_id', isLoggedIn, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            if (user.role === 'USER')
                res.render('profile/user-profile', { user })
            else (user.role === 'ADMIN')
            res.render('profile/admin-profile', { user })
        })
        .catch(error => next(new Error(error)))
})

module.exports = router