const articles = require('../models/articles.models.js')
const response = require('../response/json_result.js')

const getAllArticles = (req, res) => {
    articles.getAllArticles((error, data) => {
        const responseData = response(res.statusCode, 'list data', data)
        if(error)
            res.status(500).send({
                message: error.message || "terjadi error"
            })
        else 
          res.send(responseData)
    })
}

const createArticle = (req, res) => {

    if(Object.keys(req.body).length === 0){
        const responseData = response(400, 'content tidak boleh kosong !', [])
        res.status(400).send(responseData)
        return
    }

    // create object artikel
    const article = new articles({
        judul: req.body.judul,
        penulis: req.body.penulis,
        published: req.body.published
    })

    // save to database

    articles.create(article, (error, data) => {
        if(error){
            res.status(500).send({
                message: error.message || 'terjadi error saat membuat artikel' 
            })
        } else {
            const responseData = response(200, 'create new article', data)
            res.send(responseData)
        }
        
    })
}
  
module.exports = {getAllArticles, createArticle}