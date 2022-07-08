const router = require('express').Router()
const Store = require('../models/Store.model')
const { isLoggedIn, checkRole } = require('../middleware/route-guard')

//new store
router.get('/create', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    res.render('store/new-store')
})

router.post("/create", isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { name, street, number, city, country, zipCode, schedule, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Store
        .create({ name, street, number, city, country, zipCode, schedule, location })
        .then(() => res.redirect('/admin/stores'))
        .catch(error => next(new Error(error)))
})

//stores list
router.get("/", (req, res, next) => {

    Store
        .find()
        .then(stores => res.render('store/all-store', { stores }))
        .catch(error => next(new Error(error)))
})

//edit store
router.get("/:store_id/edit", isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { store_id } = req.params

    Store
        .findById(store_id)
        .then(store => {
            console.log('objeto', store)
            res.render("store/edit-store", store)
        })
        .catch(error => next(new Error(error)))

})

router.post("/:store_id/edit", isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { store_id } = req.params
    const { name, street, number, city, country, zipCode, schedule, latitude, longitude } = req.body
    
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    
    Store
        .findByIdAndUpdate(store_id, { name, address: { street, number, city, country, zipCode }, schedule, location })
        .then(store => res.redirect("/admin/stores"))
        .catch(error => next(new Error(error)))

})

//delete store
router.post("/:store_id/delete", isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { store_id } = req.params

    Store
        .findByIdAndDelete(store_id)
        .then(() => res.redirect('/admin/stores'))
        .catch(error => next(new Error(error)))
})


module.exports = router


