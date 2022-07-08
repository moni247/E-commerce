const router = require('express').Router()

//crud stores
router.use('/stores', require('./stores.routes'))

//crud products
router.use('/products', require('./products.routes'))

module.exports = router