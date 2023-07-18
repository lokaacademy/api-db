/*
  GET All articles : /articles
  POST Article : /article
  Get article by id : /article/:id
*/

const { getAllArticles, createArticle } = require("../controller/articles.controller")


const articlesRoute = app => {
    app.get('/articles', getAllArticles)

    app.post('/article', createArticle)

}
module.exports = articlesRoute