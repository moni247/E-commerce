const router = require("express").Router()

router.get("/", (req, res, next) => {
  console.log('current', req.session.currentUser)
  res.render("index");
})

router.use("/", require("./auth.routes"))

router.use('/products/women', require('./product.routes'))

router.use('/admin', require('./admin.routes'))

router.use('/profile', require('./profile.routes'))

module.exports = router
