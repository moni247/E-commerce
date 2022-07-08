const router = require('express').Router()

const User = require('../models/User.model')
const Product = require('../models/Product.model')

const uploader = require('../config/cloudinary.config')

const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const { rolesChecker } = require('./../utils/roles-checker')

//render profile
router.get('/:user_id', isLoggedIn, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {

            const viewerName = user.role === 'USER' ? 'user-profile' : 'admin-profile'

            res.render(`profile/${viewerName}`, { user })
        })
        .catch(error => next(new Error(error)))
})

//edit profile
router.get('/:user_id/edit', isLoggedIn, checkRole('USER', 'ADMIN'), (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('profile/edit-profile', user))
        .catch(error => next(new Error(error)))
})

router.post('/:user_id/edit', isLoggedIn, checkRole('USER', 'ADMIN'), uploader.single('imgUrl'), (req, res, next) => {

    const { username, email } = req.body
    const { user_id } = req.params

    if (req.file) {
        User
            .findByIdAndUpdate(user_id, { username, email, image: req.file.path })
            .then(user => res.redirect(`/profile/${user._id}`))
            .catch(error => next(new Error(error)))
    } else {
        User
            .findByIdAndUpdate(user_id, { username, email})
            .then(user => res.redirect(`/profile/${user._id}`))
            .catch(error => next(new Error(error)))
    }
})

module.exports = router