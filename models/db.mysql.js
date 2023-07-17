const mysql = require('mysql2')
const mysqlConfig = require('../config/mysql.config.js')

const mysqlConnection = mysql.createConnection({
    host: mysqlConfig.HOST,
    user: mysqlConfig.USER,
    password: mysqlConfig.PASSWORD,
    database: mysqlConfig.DB
})

mysqlConnection.connect(error => {
    if (error) {
        throw error
    }
    console.log('successfully connected to database')
})

module.exports = mysqlConnection