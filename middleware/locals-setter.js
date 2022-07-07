const localsSetter = (req, res, next) => {
    console.log('EJECUTANDO MIDDLEWARE DE INICILAIZACION DE VARIABLES LOCALES')
    req.app.locals.appTitle = `Nike | Shop`
    req.app.locals.userId = req.session?.currentUser?._id
    req.app.locals.globalIsLoggedIn = req.session?.currentUser ? true : false
    console.log('EL VALOR DE globalIsLoggedIn ES ', req.app.locals.globalIsLoggedIn)
    next()
}

module.exports = { localsSetter }