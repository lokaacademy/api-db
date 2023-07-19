require('dotenv').config()

const { check } = require("express-validator")
const mysqlConnection = require("./db.mysql")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* constructor */
const users = function (user) {
    this.email = user.email,
    this.password = user.password,
    this.name = user.name
}

const privateKey = process.env.PRIVATE_KEY || 'lokaacademy'

users.signUp = (newUser, result) => {
    mysqlConnection.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if(err){
            console.log('error', err)
            result(err, null)
            return
        }
        console.log('model create', {id: res.insertId, ...newUser})
        result(null, {id: res.insertId, ...newUser})
    })
}

users.login = (email, password, result) => {
    mysqlConnection.query(`SELECT id, email, name, password FROM users WHERE email = ${mysqlConnection.escape(email)}`, (err, res) => {
        if(err){
            console.log('error', err)
            result(err, null)
            return
        }
        if (!res.length) {
            result(err, null)
            console.log('not found', err)
            return
        }

        // check password
        
        bcrypt.compare(password, res[0].password, (bErr, bRes) => {
            console.log('process compare password', password)
            if(bErr){
                console.log('password error', bErr)
                result(null, 'password salah')
                return
            }
            if (bRes) {
                const token = jwt.sign({id: res[0].id}, privateKey, { expiresIn: '1h' })
                mysqlConnection.query(`UPDATE users SET last_login = now() WHERE id = '${res[0].id}' `)
                result(null, {msg: 'logged in', token: token, user: res[0]})
                return
            } else {
                res[0].status = 401
                result(null, res[0])
            }

        })
        
    })
}


module.exports = users