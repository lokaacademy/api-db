const {loginUser, registerUser, userLogout} = require('../controller/user.controller.js')
usersRoutes = (app) => {
  // public endpoint
  app.post('/users/login', loginUser)
  app.post('/users/register', registerUser)
  app.post('/users/logout', userLogout)
}
module.exports = usersRoutes