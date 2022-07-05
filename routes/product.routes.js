const router = require('express').Router()

const Product = require('./../models/Product.model')

router.get('/', (req, res, next) => {

    Product
        .find()
        .then(products => res.render('product/all-products-user', { products }))
        .catch(error => next(error))
})

router.get('/:product_id', (req, res, next) => {

    const { product_id } = req.params

    Product
        .findById(product_id)
        .then(product => {
            res.render('product/product-details', product)
        })
        .catch(error => next(error))
})

module.exports = router