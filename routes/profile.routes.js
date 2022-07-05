const router = require('express').Router()

const User = require('../models/User.model')
const Product = require('../models/Product.model')

const uploader = require('../config/cloudinary.config')

const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const { rolesChecker } = require('./../utils/roles-checker')

router.get('/:user_id', isLoggedIn, checkRole('USER', 'ADMIN'), (req, res, next) => {

    const { _id } = req.session.currentUser

    User
        .findById(user_id)
        .then(user => {
            if(user.role) false
        })
})

module.exports = router