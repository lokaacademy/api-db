const mysqlConnection = require("./db.mysql");

// koneksi ke database
//console.log(mysqlConnection)

/* constructor */
const articles = function (article) {
    this.judul = article.judul,
    this.penulis = article.penulis,
    this.published = article.published
}

articles.getAllArticles = (result) => {

    let query = "SELECT * from articles"

    mysqlConnection.query(query, (err, res) => {

        if(err){
            console.log('error ', err)
            result(null, err)
            return
        }
        console.log('model res', res)
        result(null, res)
       
    })
}

articles.create = (newArticle, result) => {
    mysqlConnection.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
        if(err){
            console.log('error', err)
            result(err, null)
            return
        }
        console.log('model create', {id: res.insertId, ...newArticle})
        result(null, {id: res.insertId, ...newArticle})
    })
}

module.exports = articles