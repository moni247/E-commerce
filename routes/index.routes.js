const router = require("express").Router()

const Store = require('../models/Store.model')

//home page
router.get('/', (req, res, next) => {

  Store
    .find()
    .limit(3)
    .then(stores => {
      res.render('index', { stores })
    })
    .catch(error => next(error))
})

//auth routes
router.use("/", require("./auth.routes"))

//render products-list
router.use('/products/women', require('./product.routes'))

//admin routes
router.use('/admin', require('./admin.routes'))

//profile routes
router.use('/profile', require('./profile.routes'))

//stores routes
router.use('/admin/stores', require('./stores.routes'))

//api
router.use('/api', require('./api.routes'))


module.exports = router
