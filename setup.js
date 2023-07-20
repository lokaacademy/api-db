const fs = require('fs')
const { execSync } = require('child_process')

// Step 1: Check .env file exists, if false create .env with MySQL config
if (!fs.existsSync('.env')) {
  const envContent = `DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_DATABASE=mydatabase`
  
  fs.writeFileSync('.env', envContent)
  console.log('.env file created with MySQL configuration.')
} else {
  console.log('.env file already exists.')
}

// Step 2: Install package.json dependencies using yarn
execSync('yarn', { stdio: 'inherit' })
console.log('Dependencies installed using yarn.')

// Step 3: Check MySQL database exists, create one if not exists
const mysql = require('mysql2')
const envConfig = require('dotenv').config().parsed
const connection = mysql.createConnection({
  host: envConfig.DB_HOST,
  user: envConfig.DB_USER,
  password: envConfig.DB_PASSWORD
})

connection.connect((error) => {
  if (error) {
    console.error('MySQL connection failed:', error)
    return
  }

  connection.query(`CREATE DATABASE IF NOT EXISTS ${envConfig.DB_NAME}`, (error) => {
    if (error) {
      console.error('Failed to create MySQL database:', error)
    } else {
      console.log('MySQL database created or already exists.')
    }

    connection.end()
  })
})

// Step 4: Create MySQL table 'users' inside the database
const dbConnection = mysql.createConnection({
  host: envConfig.DB_HOST,
  user: envConfig.DB_USER,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_NAME
})

dbConnection.connect((error) => {
  if (error) {
    console.error('MySQL connection failed:', error)
    return
  }

  const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_login DATETIME
  )`

  dbConnection.query(createTableQuery, (error) => {
    if (error) {
      console.error('Failed to create users table:', error)
    } else {
      console.log('MySQL table "users" created or already exists.')
      createArticlesTable();

    }

    dbConnection.end()
  })


  function createArticlesTable() {
    const dbConnection = mysql.createConnection({
      host: envConfig.DB_HOST,
      user: envConfig.DB_USER,
      password: envConfig.DB_PASSWORD,
      database: envConfig.DB_NAME
    });
  
    dbConnection.connect((error) => {
      if (error) {
        console.error('MySQL connection failed:', error);
        return;
      }
  
      const createTableQuery = `CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        judul VARCHAR(255) NOT NULL,
        penulis VARCHAR(255) NOT NULL,
        published INT
      )`;
  
      dbConnection.query(createTableQuery, (error) => {
        if (error) {
          console.error('Failed to create articles table:', error);
        } else {
          console.log('MySQL table "articles" created or already exists.');
        }
  
        dbConnection.end();
      });
    });
  }

  
})
