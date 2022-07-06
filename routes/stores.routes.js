const router = require('express').Router()
const Store = require('../models/Store.model')
const { isLoggedIn, checkRole } = require('../middleware/route-guard')

router.get('/create', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    res.render('store/new-store')
})

router.post("/create", isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { name, address, schedule, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Store
        .create({ name, address, schedule, location })
        .then(() => res.redirect('/admin/stores'))
        .catch(error => next(new Error(error)))
})

router.get("/", (req, res, next) => {

    Store
        .find()
        .then(stores => res.render('store/all-store', { stores }))
        .catch(error => next(new Error(error)))
})

router.get("/:store_id/edit", (req, res, next) => {

    const { store_id } = req.params

    Store
        .findById(store_id)
        .then(store => res.render("store/edit-store", store))
        .catch(error => next(new Error(error)))

})

router.post("/:store_id/edit", (req, res, next) => {

    const { store_id } = req.params
    const { name, address, schedule, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Store
        .findById(store_id, { name, address, schedule, location })
        .then(store => res.render("store/edit-store", store))
        .catch(error => next(new Error(error)))

})

router.get("/:store_id/delete", (req, res, next) => {

    const { store_id } = req.params

    Store
        .findByIdAndDelete(store_id)
        .then(() => res.redirect('/stores'))
        .catch(error => next(new Error(error)))
})


module.exports = router


