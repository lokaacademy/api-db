const { Result } = require('express-validator')
const users = require('../models/users.models.js')
const response = require('../response/json_result.js')
const bcrypt = require('bcrypt')

let responseData = {}
let userData = {}
loginUser = (req, res) => {
    users.login(req.body.email, req.body.password, (error, data) => {
        if(error)
            res.status(500).send({
                message: error.message || "terjadi error"
            })
            
        else 
            if (data.status === 401) {
                responseData = response(401, 'password salah !', [])
                res.send(responseData)
            } else {
                userData = data.user
                responseData = response(200, data.msg, {token: data.token, user: { email: userData.email, name: userData.name }})
                res.send(responseData)
            }

            
    })
}

registerUser = (req, res) => {

    let reqPassword = req.body.password

    
    async function encryptPassword() {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(reqPassword, salt)
        return hash
    }
      
    (async () => {
       
        const email = req.body.email
        const name = req.body.name
        const newUser = {
            email: email,
            name: name,
            password: await encryptPassword()
        }
        
        
        if(Object.keys(req.body).length === 0){
            responseData = response(400, 'content tidak boleh kosong !', [])
            res.status(400).send(responseData)
            return
        }

        users.signUp(newUser, (error, data) => {
            if(error){
                responseData = response(500, 'error saat register user', [])
                res.status(500).send(responseData)
            } else {
                responseData = response(200, 'create new user', data)
                res.send(responseData)
            }
        })

    })()

    

    
    

    

    


}

module.exports = {loginUser, registerUser}