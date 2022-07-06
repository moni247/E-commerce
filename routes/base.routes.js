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
    .catch(error => next(new Error(error)))
})

module.exports = router