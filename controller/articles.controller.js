const articles = require('../models/articles.models.js')
const response = require('../response/json_result.js')

let responseData = {}

// get all articles
const getAllArticles = (req, res) => {
    articles.getAllArticles((error, data) => {
        responseData = response(res.statusCode, 'list data', data)
        if(error)
            res.status(500).send({
                message: error.message || "terjadi error"
            })
        else 
          res.send(responseData)
    })
}

// find article by id
const findOne = (req, res) => {
    articles.findById(req.params.id, (err, data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}`
                })
            } else {
                res.status(500).send({
                    message: `Not found Tutorial with id ${req.params.id}`
                })
            }
        } else {
            res.send(data)
        }
    })
}

// create new article
const createArticle = (req, res) => {
    if(Object.keys(req.body).length === 0){
        responseData = response(400, 'content tidak boleh kosong !', [])
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
            responseData = response(500, 'error saat menambah artikel', [])
            res.status(500).send(responseData)
        } else {
            responseData = response(200, 'create new article', data)
            res.send(responseData)
        }
        
    })
}

//delete article
const deleteArticle = (req, res) => {
    articles.delete(req.params.id, (err, data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}`
                })
            } else {
                res.status(500).send({
                    message: `Not found Tutorial with id ${req.params.id}`
                })
            }
        } else {
            responseData = response(200, `delete article ${req.params.id} success`, {})
            res.send(responseData)
        }
    })
}

//update article
const updateArticle = (req, res) => {
    const article = {
        judul: req.body.judul,
        penulis: req.body.penulis,
        published: req.body.published
    }
    articles.update(req.params.id, article, (err, data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}`
                })
            } else {
                res.status(500).send({
                    message: `Not found Tutorial with id ${req.params.id}`
                })
            }
        } else {
            responseData = response(200, `update article ${req.params.id} success`, data)
            res.send(responseData)
        }
    })
}

module.exports = {getAllArticles, createArticle, findOne, deleteArticle, updateArticle}