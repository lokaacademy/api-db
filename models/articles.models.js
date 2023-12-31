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

    let query = `SELECT judul, penulis from articles WHERE delete_at IS NULL`

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

articles.findById = (id, result) => {
    mysqlConnection.query(`SELECT * FROM articles WHERE id= ${id}`, (err, res) => {
        if(err){
            console.log('error', err)
            result(err, null)
            return
        }
        console.log('model find', res)
        result(null, res)
    })
}

articles.delete = (id, result) => {
    mysqlConnection.query(`UPDATE articles SET delete_at = now() WHERE id= ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
          }
      
          console.log("deleted tutorial with id: ", id);
          result(null, res);
    })
}

articles.update = (id, article, result) => {
    mysqlConnection.query('UPDATE articles SET judul = ?, penulis = ?, published = ?  WHERE id = ?',
    [article.judul, article.penulis, article.published, id] 
    ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
          }
      
          console.log("updated tutorial: ", { id: id, ...article })
          result(null, { id: id, ...article })
    })
}

module.exports = articles