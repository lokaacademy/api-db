/*
  GET All articles : /articles
  POST Article : /article
  Get article by id : /article/:id
*/

const { getAllArticles, createArticle, findOne, deleteArticle, updateArticle } = require("../controller/articles.controller")


const articlesRoutes = app => {
    app.get('/articles', getAllArticles)
    app.get('/article/:id', findOne)
    app.post('/article', createArticle)
    app.delete('/article/:id', deleteArticle)
    app.put('/article/:id', updateArticle)
}
module.exports = articlesRoutes