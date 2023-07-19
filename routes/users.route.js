const {loginUser, registerUser} = require('../controller/user.controller.js')
usersRoutes = app => {
  app.post('/users/login', loginUser)
  app.post('/users/register', registerUser)
}
module.exports = usersRoutes