const router = require('express').Router()
const { isLoggedIn, } = require('../middleware/route-guard')
const Cart = require('../models/Cart.model')

router.post("/add-product-to-cart/:product_id", isLoggedIn, (req, res, next) => {

    const { product_id } = req.params

    Cart
        .findOne({ user: req.session.currentUser._id })
        .then(cart => Cart.findByIdAndUpdate(cart._id, { $push: { items: { product: product_id, quantity: 1 } } }))
        .then(() => res.redirect('/products/women'))
        .catch(error => next(new Error(error)))

})






module.exports = router