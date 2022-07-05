const router = require('express').Router()

const Product = require('../models/Product.model')
const uploader = require('../config/cloudinary.config')
const { isLoggedIn, checkRole } = require('../middleware/route-guard')

router.get('/products', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    Product
        .find()
        .then(products => res.render('product/all-products-admin', { products }))
        .catch(error => next(new Error(error)))
})

router.get('/products/create', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    res.render('product/new-product')
})

router.post('/products/create', uploader.single('imgUrl'), (req, res, next) => {

    const { name, description, price, category } = req.body

    Product
        .create({ name, description, price, images: [req.file.path], category })
        .then(() => res.redirect('/admin/products'))
        .catch(error => next(new Error(error)))
})

router.get('/:product_id/edit', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { product_id } = req.params

    Product
        .findById(product_id)
        .then(product => res.render('product/edit-product', product))
        .catch(error => next(new Error(error)))
})

router.post('/:product_id/edit', uploader.single('imgUrl'), (req, res, next) => {

    const { name, description, price, category } = req.body
    const { product_id } = req.params

    Product
        .findByIdAndUpdate(product_id, { name, description, price, images: [req.file.path], category })
        .then(product => res.redirect(`/products/women/${product._id}`))
        .catch(error => next(new Error(error)))
})

router.post('/:product_id/delete', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { product_id } = req.params

    Product
        .findByIdAndDelete(product_id)
        .then(() => res.redirect('/admin/products'))
        .catch(error => next(new Error(error)))
})


module.exports = router