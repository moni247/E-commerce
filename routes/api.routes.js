const router = require("express").Router()

const Store = require('./../models/Store.model')

router.get('/', (req, res) => {

    Store
        .find()
        .then(stores => res.json(stores))
        .catch(err => res.json({ Message: 'server error', err }))
})

module.exports = router