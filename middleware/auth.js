const jwt = require('jsonwebtoken')
const { secretKey } = require('./config')
const response = require('../response/json_result.js')

let responseData = {}

const generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
    return token
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.SESSION_ID
    
    if(!token){
        responseData = response(401, 'No token provide', [])
        res.send(responseData)
        return
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            responseData = response(401, 'No token provide', [])
            res.send(responseData)
            return 
          }
      
          req.userId = decoded.userId;
          next();
    })
}

module.exports = {generateToken, verifyToken}