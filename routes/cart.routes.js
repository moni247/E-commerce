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

            let total = 0
            let inCart = cart.items.length
        
            cart.items.forEach(item => {
                total += Number(item.product.price)
            })
            console.log('carrito', cart)
            console.log('productos', cart.items[0].product.name)
            res.render('cart/payment-cart', { cart, total, inCart })
        })
        .catch(error => next(new Error(error)))

})

//add product to cart button
router.post('/add-to-cart/:product_id', isLoggedIn, checkRole('USER'), (req, res, next) => {

    const { product_id } = req.params

    Cart
        .findOne({ user: req.session.currentUser._id })
        .then(cart => Cart.findByIdAndUpdate(cart._id, { $push: { items: { product: product_id, quantity: 1 } } }))
        .then(() => res.redirect('/products/women'))
        .catch(error => next(new Error(error)))

})






module.exports = router