/*
  GET All articles : /articles
  POST Article : /article
  Get article by id : /article/:id
*/

const { getAllArticles, createArticle, findOne } = require("../controller/articles.controller")


const articlesRoute = app => {
    app.get('/articles', getAllArticles)
    app.get('/article/:id', findOne)
    app.post('/article', createArticle)

}
module.exports = articlesRoute