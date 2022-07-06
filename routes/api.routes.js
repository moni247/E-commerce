const router = require("express").Router()

const Store = require('./../models/Store.model')

router.get('/', (req, res) => {

    Store
        .find()
        .then(stores => res.json(stores))
        .catch(err => res.status(500).json({ message: 'server error', err }))
})

module.exports = router