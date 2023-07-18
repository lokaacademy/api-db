const articlesRoute = './articles.route.js'
const appRouter = (app) => {
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
      });

    articlesRoute(app)
}


module.exports = appRouter