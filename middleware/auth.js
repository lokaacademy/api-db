const jwt = require('jsonwebtoken')
const { secretKey } = require('./config')
const response = require('../response/json_result.js')

let responseData = {}

const generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
    return token
}

const verifyToken = (req, res, next) => {
    //const token = req.cookies.SESSION_ID /* menggunakan cookies */

    if (!req.headers.authorization) {
        responseData = response(401, 'No token provide', [])
        res.send(responseData)
        return
      }
  
      const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
      console.log('token ', token)

    /* const bearerHeaders = req.headers['authorization] menggunakan headers */
    
    if(!token)
    {
        responseData = response(401, 'No token provide', [])
        res.send(responseData)
        return
    }

    // verifikasi membership
    const checkMembership = (membership, mErr) => {
        if(membership === 'free'){
            mErr.status = 401
            mErr.message = 'free member tidak bisa mengakses konten ini'
            return mErr
        }
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
        req.membership = decoded.membership
        console.log('membership', req.membership)

        let membership = checkMembership(req.membership, mErr => {
        membership = mErr
        })

        if(membership){
            if(membership.status = 401){
                responseData = response(membership.status, membership.message, [])
                res.send(responseData)
                return
            }
        }
    
        next();
    })

}

module.exports = {generateToken, verifyToken}