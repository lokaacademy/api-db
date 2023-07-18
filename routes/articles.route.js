/*
  GET All articles : /articles
  POST Article : /article
  Get article by id : /article/:id
*/

const { getAllArticles, createArticle, findOne, deleteArticle } = require("../controller/articles.controller")


const articlesRoute = app => {
    app.get('/articles', getAllArticles)
    app.get('/article/:id', findOne)
    app.post('/article', createArticle)
    app.delete('/article/:id', deleteArticle)
}
module.exports = articlesRoute