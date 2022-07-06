const router = require('express').Router()

router.use('/stores', require('./stores.routes'))

router.use('/products', require('./products.routes'))

module.exports = router