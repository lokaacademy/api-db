const jwt = require('jsonwebtoken')
const { secretKey } = require('./config')
const response = require('../response/json_result.js')

let responseData = {}

const generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
    return token
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.SESSION_ID /* menggunakan cookies */

    /* const bearerHeaders = req.headers['authorization] menggunakan headers */
    
    if(!token)
    {
        responseData = response(401, 'No token provide', [])
        res.send(responseData)
        return
    }

    // verify jwt token

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            responseData = response(401, 'Token tidak sesuai', [])
            res.send(responseData)
            return 
          }
      
          req.id = decoded.id /* cara mengambil payload pada token */
          req.email = decoded.email
          console.log(req.email)
          next();
    })
}

module.exports = {generateToken, verifyToken}