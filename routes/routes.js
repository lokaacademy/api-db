const articlesRoutes = require('./articles.route.js')
const usersRoutes = require('./users.route.js')
    
const appRouter = app => {

    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
      });
    
    articlesRoutes(app)
    usersRoutes(app)
    
}


module.exports = appRouter