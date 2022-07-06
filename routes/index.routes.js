const { isLoggedIn } = require("../middleware/route-guard")

const router = require("express").Router()


//base routes
router.use("/", require("./base.routes"))

//auth routes
router.use("/", require("./auth.routes"))

//render products-list
router.use('/products/women', require('./product.routes'))

//admin routes
router.use('/admin', require('./admin.routes'))

//profile routes
router.use('/profile', require('./profile.routes'))

//api
router.use('/api', require('./api.routes'))


module.exports = router
