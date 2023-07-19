/*
  GET All articles : /articles
  POST Article : /article
  Get article by id : /article/:id
*/

const { getAllArticles, createArticle, findOne, deleteArticle, updateArticle } = require("../controller/articles.controller")
const { verifyToken } = require("../middleware/auth")


const articlesRoutes = (app) => {
  // protected endpoint
    app.get('/articles', verifyToken, getAllArticles)
    app.get('/article/:id', verifyToken,findOne)
    app.post('/article', verifyToken, createArticle)
    app.delete('/article/:id', verifyToken, deleteArticle)
    app.put('/article/:id', verifyToken, updateArticle)
}
module.exports = articlesRoutes