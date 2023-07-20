require('dotenv').config()

const databaseUser = process.env.DB_USER
const databaseHost = process.env.DB_HOST
const databasePassword = process.env.DB_PASSWORD
const databaseName = process.env.DB_NAME

module.exports = {
    HOST: databaseHost,
    USER: databaseUser,
    PASSWORD: databasePassword,
    DB: databaseName
  };