const router = require('express').Router()
const { isLoggedIn, checkRole, } = require('../middleware/route-guard')
const Cart = require('../models/Cart.model')
const User = require('../models/User.model')

//render payment-cart
router.get('/profile/:user_id/payment', isLoggedIn, checkRole('USER'), (req, res, next) => {

    Cart
        .findOne({ user: req.session.currentUser._id })
        .populate('user')
        .populate('items.product')
        .then(cart => {
            if (cart.items.length === 0) res.render('cart/empty-cart')
            else {
                let total = 0
                let inCart = 0

                cart.items.forEach(item => {
                    inCart += item.quantity
                    total += Number(item.product.price) * item.quantity
                })

                res.render('cart/payment-cart', { cart, total, inCart })
            }
        })
        .catch(error => next(new Error(error)))

})

//add product to cart button
router.post('/add-to-cart/:product_id', isLoggedIn, checkRole('USER'), (req, res, next) => {

    const { product_id } = req.params

    Cart
        .findOne({ user: req.session.currentUser._id })
        .then(({ _id, items }) => {

            const itemsCopy = [...items]

            let alredyIn = false

            itemsCopy.forEach(item => {
                if (item.product._id.equals(product_id)) {
                    item.quantity++
                    alredyIn = true
                }
            })

            const query = alredyIn ? { items: itemsCopy } : { $push: { items: { product: product_id } } }

            return Cart.findByIdAndUpdate(_id, query)
        })
        .then(() => res.redirect('/products/women'))
        .catch(error => next(new Error(error)))

})

//remove product from cart
router.post('/remove-from-cart/:product_id', isLoggedIn, checkRole('USER'), (req, res, next) => {

    const { product_id } = req.params

    Cart
        .findOne({ user: req.session.currentUser._id })
        .then(cart => Cart.findByIdAndUpdate(cart._id, { $pull: { items: { product: product_id } } }))
        .then(() => res.redirect('/profile/:user_id/payment'))
        .catch(error => next(new Error(error)))
})

module.exports = router
