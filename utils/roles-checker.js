const isAdmin = user => user.role === 'ADMIN'
const isUser = user => user.role === 'USER'
const isLogged = (req, res) => req.session.currentUser

module.exports = { isAdmin, isUser, isLogged }