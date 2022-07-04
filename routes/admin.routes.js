const router = require('express').Router()

const { create } = require('hbs')
const Product = require('../models/Product.model')
const User = require('./../models/User.model')

router.get('/products', (req, res, next) => {

    Product
        .find()
        .then(products => res.render('product/all-products-admin', { products }))
        .catch(error => next(error))
})

router.get('/products/create', (req, res, next) => {
    res.render('product/new-product')
})

router.post('/products/create', (req, res, next) => {

    const { name, description, price, images, category } = req.body

    Product
        .create({ name, description, price, images, category })
        .then(() => res.redirect('/product/all-products-admin'))
        .catch(error => next(error))
})

router.get('/:product_id/edit', (req, res, next) => {

    const { product_id } = req.params

    Product
        .findById(product_id)
        .then(product => res.render('product/edit-product', product))
        .catch(error => next(error))
})

router.post('/:product_id/edit', (req, res, next) => {

    const { name, description, price, images, category } = req.body
    const { product_id } = req.params

    Product
        .findByIdAndUpdate(product_id, { name, description, price, images, category })
        .then(product => res.redirect(`/products/women/${product._id}`))
        .catch(error => next(error))
})

router.post('/:product_id/delete', (req, res, next) => {

    const { product_id } = req.params

    Product
        .findByIdAndDelete(product_id)
        .then(() => res.redirect('/products'))
        .catch(error => next(error))
})


module.exports = router