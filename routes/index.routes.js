const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.render("index");
})

router.use("/", require("./auth.routes"))

module.exports = router
