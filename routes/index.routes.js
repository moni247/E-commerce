const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.render("index");
})

router.use("/", require("./auth.routes"))

router.use('/products/women', require('./product.routes'))

router.use('/admin', require('./admin.routes'))

module.exports = router
